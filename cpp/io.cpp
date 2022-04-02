#include< iostream. h>
#include< fstream. h>
void main()
{
ofstream outfile(“item”);
cout <<“Enter item name”;
char name[30];
cin >>name;
outfile <<name<<“\n”;
cout <<“Enter item cost”;
float cost;
cin>>cost;
outfile << cost<<“\n”;
outfile. Close();
ifstream infile (“item”);
infile >>name;
infile>>cost;
cout << “\n”;
cout << “Item name:”<<name<<“\n”;
cout<<“Item cost:”<<cost<<“\n”;
infile. Close();
}
