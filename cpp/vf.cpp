#include<iostream>
using namespace std;
class base
{
public:
virtual void display()
{
cout<<”\nBase”;
}
void dis ()
{
cout<<”Base 2 “;
}
class derived:public base
{
public:
void display()
{
cout<<”\nDerived”;
}
void disc ()
{
cout <<” Derived 2”;}
}
};
int main (){
base *ptr;
base b1;
ptr= &b1;
ptr->display();
ptr->dis ();
derived d;
ptr->display();
ptr->dis ();
return 0;
}
