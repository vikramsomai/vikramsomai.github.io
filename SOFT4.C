#include<stdio.h>
#include<conio.h>
#include<dos.h>
#include<stdlib.h>
void dro();
struct student{
int rollno;
char name[100];
char add[100];
char city[100];
char gender[20],country[100],state[100];
long int num;
};
struct login{
char name[100];
char pass[100];
};
union REGS i,o;
void menu();
void show()
{
i.x.ax=1;
int86(51,&i,&o);
}
void mouse(int*x,int*y,int*b)
{
i.x.ax=3;
int86(51,&i,&o);
*x=o.x.cx;
*y=o.x.dx;
*b=o.x.bx;
}
void sign()
{
FILE*sign;
struct login l[100];
int a,i;
char name[100],pass[100];
clrscr();
sign=fopen("c:\\login.xlsx","a");
for(i=0;i<1;i++)
{//textbackground(11);
textcolor(4);
gotoxy(5,8);cprintf("enter the name:");
fflush(stdin);
gotoxy(20,8);gets(l[i].name);
gotoxy(5,10);cprintf("enter password:");
gotoxy(20,10);gets(l[i].pass);
fprintf(sign,"%s %s\n",l[i].name,l[i].pass);
}
fclose(sign);
}
void login()
{
int i;
struct login l[100];
FILE*login;
char a[100],b[100];
clrscr();
login=fopen("c:\\login.xlsx","r");
s:
for(i=8;i<15;i++)
{
gotoxy(20,i);
textbackground(8);
cprintf("%30c",0);
}
gotoxy(40,20);cprintf("sign up");
gotoxy(28,8);cprintf("Login");
textcolor(3);
gotoxy(22,9);cprintf("Name:");
gotoxy(22,11);cprintf("Password:");
gotoxy(28,9);scanf("%s",a);
gotoxy(32,11);scanf("%s",b);


for(i=0;i<1;i++)
{
if(fscanf(login,"%s %s",l[i].name,l[i].pass)!=EOF)
{
if(stricmp(l[i].name,a)==0&&stricmp(l[i].pass,b)==0)
{
clrscr();
textbackground(11);
menu();
}
else{
textcolor(RED);
textbackground(11);
gotoxy(20,5);
cprintf("wrong password");
//textcolor(0);
//delay(2);
exit(0);
goto s;

}         }     }
fclose(login);
  }
  void file()
  {

  int i;
struct student s[10];
FILE*fp;
clrscr();
menu();
fp=fopen("c:\\data.txt","a");
gotoxy(5,5);
_setcursortype(_NORMALCURSOR);
cprintf("Name:");

gotoxy(4,7);
cprintf("address:");
gotoxy(4,9);
cprintf("ph.no");
gotoxy(5,11);
cprintf("city");
gotoxy(30,5);cprintf("gender");
textbackground(9);
gotoxy(12,5);  //name
cprintf("%15c",0);
gotoxy(12,7);     //address
cprintf("%15c",0);
gotoxy(12,9);
cprintf("%15c",0);
gotoxy(12,11);
cprintf("%15c",0);
gotoxy(40,5);cprintf("%15c",0);
for(i=0;i<1;i++)
{
gotoxy(12,5);
scanf("%s",&s[i].name);
//textbackground(BLUE);
gotoxy(12,7);
scanf("%s",&s[i].add);

gotoxy(12,9);scanf("%ld",&s[i].num);
fflush(stdin);
gotoxy(12,11);scanf("%s",s[i].city);
gotoxy(41,5);scanf("%s",s[i].gender);
 fprintf(fp,"%s %s %ld %s %s\n",s[i].name,s[i].add,s[i].num,s[i].city,s[i].gender);
 }
 fclose(fp);
}
void edit()
{

FILE*fpt;
struct student s[10];
int i;
menu();
fpt=fopen("c:\\data.txt","r");
_setcursortype(_NOCURSOR);
gotoxy(25,2);cprintf("databse");
gotoxy(4,4);cprintf("name");
gotoxy(25,4);cprintf("address");
gotoxy(45,4);cprintf("ph.no");
gotoxy(62,4);cprintf("city\n");
gotoxy(70,4);cprintf("gender\n");
for(i=0;i<80;i++)
{gotoxy(i,5);
cprintf("%c",196);
}
    for(i=0;i<100;i++)
    {
if(fscanf(fpt,"%s %s %ld %s %s",s[i].name,s[i].add,&s[i].num,s[i].city,s[i].gender)!=EOF)

{
//printf("\n");
gotoxy(4,6+i);cprintf("%s",s[i].name);
gotoxy(25,6+i);cprintf("%s",s[i].add);
gotoxy(45,6+i);cprintf("%ld",s[i].num);
gotoxy(62,6+i);cprintf("%s",s[i].city);
gotoxy(70,6+i);cprintf("%s",s[i].gender);
}
}
fclose(fpt);
}
void menu()
{
int i;
clrscr();
_setcursortype(_NOCURSOR);
//textbackground(11);
for(i=1;i<81;i++)
{
gotoxy(i,1);
textbackground(9);
cprintf("%c",0);
}
   {
textcolor(YELLOW);
gotoxy(2,1);
cprintf("%c",240);
gotoxy(7,1);
cprintf("File");
gotoxy(13,1);
cprintf("Edit");
gotoxy(20,1);
cprintf("Search");
gotoxy(28,1);cprintf("Help");
gotoxy(35,1);cprintf("About");
gotoxy(41,1);cprintf("Exit");
textbackground(11);   }
 }
 void list()
 {
 gotoxy(7,2);

 }
 void file1()
{   int i;
  for(i=0;i<6;i++)
  {   gotoxy(3,2+i);
 
  textbackground(9);
  cprintf("%11c",0);
  }
  
  for(i=0;i<8;i++)
  {
  gotoxy(4+i,2);
  cprintf("%c",196);
 
  }
  dro();
  textbackground(11);
  }
  void dro()
{
//_setcursortype(_NOCURSOR);
gotoxy(6,3);
textcolor(YELLOW);
cprintf("New");
gotoxy(6,4);
cprintf("Open");
  }
  void edit1()
{   int i;
  for(i=0;i<6;i++)
  {   gotoxy(17,2+i);
 
  textbackground(9);
  cprintf("%11c",0);
  }
  for(i=0;i<8;i++)  {
  gotoxy(18+i,2);
  cprintf("%c",196);
  }}
  void clr()
  {
  	int i;
  for(i=0;i<100;i++)
  {
  	gotoxy(0,2+i);
  textbackground(11);
  cprintf("%c",0);
  }
  }
  
 void main()
 {
int x,y,b,men=-1;
clrscr();
//sign();
textbackground(11);
fflush(stdin);
login();
textbackground(11);
 //menu();

 while(1)
 {
 delay(50);
 show();
 mouse(&x,&y,&b);
 if(b==1)
 {
 if(x>=30&&x<=80&&y>=0&&y<10)
 {
men=1;// file1();
  }
else  if(x>=150&&x<=190&&y>=0&&y<10)
 {
men=5;// edit1();
  }
else  if(x>=100&&x<=140&&y>=0&&y<=10)
  {
 men=2;//edit();
  }
else  if(x>=280&&x<=310&&y>=0&&y<=10)
  {
  	men=3;//exit;
}
else  if(x>=34&&x<=100&&y>=10&&y<=20)
{
men=4;//file();
}
else  if(x>=300&&x<=350&&y>=0&&y<10)
 {
men=6;// exit();
  }
else
 men=-1;
 delay(100);
	 menu();
	switch(men)
	{
		case 1:
		 delay(200);
		file1();
		break;
		case 2:
		delay(200);
		edit();
		break;
		case 4:
		delay(200);
		file();
		break;
		case 5:
		delay(200);
		edit1();
		break;
		case 6:
		exit(0);
		}
		
  }
}

getch();
}