/* Othello - by David Weekly [dew@cs.stanford.edu] */

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <math.h>
#include "config.h"

typedef char board[8][8];
static const char ROWS[] = "ABCDEFGH";
static board b;

static void showboard(){
  int i,j;
  printf("   ");
  for(j=0;j<8;j++){
    printf("  %c ",ROWS[j]);
  }
  printf("\n");
  printf("   ");  
  for(j=0;j<8;j++){
    printf("+---");
  }
  printf("+\n");
  for(i=0;i<8;i++){
    printf(" %d ",i+1);
    for(j=0;j<8;j++){
      printf("| %c ",b[i][j]);
    }
    printf("|\n   ");
    for(j=0;j<8;j++){
      printf("+---");
    }
    printf("+\n");
  }
  printf("\n");
}

/* determine if the game is over (all spaces are filled!) */
static int gameover(int isOver){
  int i,j;
  int human=0,computer=0;
  for(i=0;i<8;i++)
    for(j=0;j<8;j++){
      switch(b[j][i]){
      case ' ':
	if(!isOver) return 0;
	break;
      case '*':
	computer++;
	break;
      case 'O':
	human++;
	break;
      }
    }
  if(human>computer){
    printf("\n\nCongratulations! You beat the computer %d to %d !\n\n",human,computer);
    printf("don't worry: harder versions will be coming out soon:\n");
    printf("  go to http://david.weekly.org/othello/ for updated,\n");
    printf("  more intelligent versions...=)\n\n");
  }else if(computer>human){
    printf("\n\nDoh! The computer beat you %d to %d!\n\n",computer,human);
  }
  else{
    printf("Amazing! You tied the computer! This is a very uncommon event!\n");
  }
  return 1;
}

/*=========================================================================
  see if there is a piece matchine the 'side' variable at the end of this
  string of opposing pieces. if so, return how many opposing pieces were
  between the two.
*/
static int testmove(int x,int y,board o,char side,int dx,int dy,char execute){
  int pieces=0;
  int ox,oy;
  char found_end='N';

  ox=x;
  oy=y;
  x+=dx;
  y+=dy;
  while((y<8) && (y>=0) && (x<8) && (x>=0) && found_end=='N'){
    if(o[y][x]==side)
      found_end='Y';
    else if(o[y][x]==' ')
      break;
    else
      pieces++;
    x+=dx;
    y+=dy;
  }
  if(found_end=='Y'){
    /* if so directed, go back and actually flip the pieces */
    if(execute=='Y'){
      while((x!=ox) || (y!=oy)){
	x-=dx;
	y-=dy;
	o[y][x]=side;
      }
    }
    return pieces;
  }
  /* didn't find an end -- can't make the move */
  return 0;
}


/*=========================================================================
  for a given x/y coordinate on a given othello board, return the number of
  captured pieces -- 0 connotes an illegal move, since you are not allowed
  to not capture pieces in an Othello move! Set execute to 'Y' to actually
  do the move and flip the pieces.
*/
static int validmove(int x,int y, board o, char side,char execute){
  char opp=' ';
  int pieces=0;

  if(side=='*') opp='O';
  if(side=='O') opp='*';

  if(x>0){
    if(y>0)
      if(o[y-1][x-1]==opp)
	pieces+=testmove(x,y,o,side,-1,-1,execute);
    if(o[y][x-1]==opp)
      pieces+=testmove(x,y,o,side,-1,0,execute);
    if(y<7)
      if(o[y+1][x-1]==opp)
	pieces+=testmove(x,y,o,side,-1,1,execute);      
  }
  if(y>0)
    if(o[y-1][x]==opp)
      pieces+=testmove(x,y,o,side,0,-1,execute);
  if(y<7)
    if(o[y+1][x]==opp)
      pieces+=testmove(x,y,o,side,0,1,execute);
  if(x<7){
    if(y>0)
      if(o[y-1][x+1]==opp)
	pieces+=testmove(x,y,o,side,1,-1,execute);
    if(o[y][x+1]==opp)
      pieces+=testmove(x,y,o,side,1,0,execute);
    if(y<7)
      if(o[y+1][x+1]==opp)
	pieces+=testmove(x,y,o,side,1,1,execute);
  }
  return pieces;
}

/* returns 1 if some move can be made */
static int canmove(board o,char side){
  int i,j;
  for(i=0;i<8;i++)
    for(j=0;j<8;j++)
      if(o[j][i]==' ')
	if(validmove(i,j,o,side,'N'))
	  return 1;
  return 0;
}


static void humanmove(char side){
  int x,y;
  char movebuf[80];
  char *move;
  char okay='N';
  
  while(okay=='N'){
    char col;
    showboard();
        
    printf("%c's move (? for help) ",side);
    do{
      move = fgets(movebuf,79,stdin);      
    }while((move==NULL) || (movebuf[0]==' ') || (movebuf[0]=='\n') || (movebuf[0]=='\r'));
    col = movebuf[0];

    if((col==' ')||(col=='\r')||(col=='\n'))
      continue;
    else if (col=='?'){
      printf("\n OTHELLO by David Weekly\n");
      printf("  q = Quit Othello\n");
      printf("  ? = Othello Help (what you're looking at)\n");
      printf("  [letter][digit] = a move (e.g., E3 or A5)\n\n");
      printf("Tell me what you think: dew@cs.stanford.edu\n\n");
      printf("More intelligent versions will soon be forthcoming,\n");
      printf(" watch http://david.weekly.org/othello/ for updates.\n\n");
      printf("This program and source released freely under the GNU\n");
      printf("    General Public License (see COPYING)\n\n");
    }
    else if((col=='q') || (col=='Q')){
      printf("quitting othello...\n");
      exit(0);
    }
    else{
      char row = movebuf[1];
      if(!isalpha((int)col) || !isdigit((int)row) ){
	printf("Invalid move: moves should be in the format column row,\n");
	printf("              such as 'C3' or 'E6' (without the quotes)\n");
	printf("\n\n");
      }
      else{
	char valid='Y';
	x=tolower(col)-'a';
	y=row-'1';
	
	if((y>=8) || (y<0)){
	  printf("Enter a row between 1 and 8!\n");
	  valid='N';
	}
	if((x>=8) || (x<0)){
	  printf("Enter a column between A and H!\n");
	  valid='N';	 
	}
	if(b[y][x]!=' '){
	  printf("That space is already occupied!\n");
	  valid='N';
	}
	if(valid=='Y'){
	  int pieces;
	  if((pieces=validmove(x,y,b,side,'Y')) > 0){
	    okay='Y';
	    printf("Great! You captured %d pieces!\n",pieces);
	  }else{
	    printf("That is not a valid move!\n");
	  }
	}
      }
    }
      
    if(okay!='Y'){
      printf("[press enter to move]\n\n");
      move = fgets(movebuf,79,stdin);
    }
    
  }
}

/* returns the "worth" of a move (bigger is better) */
static float movevalue(int x,int y,board o,char side,int depth){
  board t;
  char opp;
  int i,j,pieces,maxpieces=-500,nmoves=0;
  int ox,oy;
  float value;

  if(side=='*') opp='O';
  if(side=='O') opp='*';

  /* copy the board */
  for(i=0;i<8;i++)
    for(j=0;j<8;j++)
      t[j][i]=o[j][i];

  /* play the space */
  value = (float)validmove(x,y,t,side,'Y');

  /* assume an immediately optimal opponent and find best move */
  for(i=0;i<8;i++)
    for(j=0;j<8;j++)
      if(o[j][i]==' ')
	if((pieces=validmove(i,j,t,opp,'N')) > 0){
	  if(pieces>maxpieces){
	    maxpieces=pieces;
	    ox=i;
	    oy=j;
	  }
	  nmoves++;
	}
  
  if(nmoves)
    value -= (float)(validmove(ox,oy,t,opp,'Y')-1);
  else{
#ifdef VERBOSE
    printf(" [calc] no possible opponent moves!\n");
#endif VERBOSE
    value += 1;
  }
  
#ifdef VERBOSE
  printf(" [calc] %c%d = %f\n",x+'A',y+1,value);
#endif VERBOSE
  return value;
}


/* DUMB algorithm: just selects the first possible slot */
static void computermove(board o,char side){
  int i,j,mx,my;
  int pieces;
  float value,maxvalue=-1000000;
  for(i=0;i<8;i++)
    for(j=0;j<8;j++)
      if(o[j][i]==' ')
	if((pieces=validmove(i,j,o,side,'N')) > 0){
	  value=movevalue(i,j,o,side,1);
	  if(value>maxvalue){
	    maxvalue=value;	   
	    mx=i;
	    my=j;
	  }
	}
  
  pieces=validmove(mx,my,o,side,'Y');
  printf("I moved at %c%d and captured %d of your pieces!\n",
	 mx+'A',my+1,pieces);
}


void parseline(char *line,int linenum){
  int i,j;
  for(i=5,j=0;j<8;i+=4,j++)
    b[linenum][j]=line[i];
}

void readboard(char *fname){
  char linebuf[40];
  FILE *bfile = fopen(fname,"r");
  int i;

  fgets(linebuf,40,bfile);
  for(i = 0; i<8; i++){
    fgets(linebuf,40,bfile); // dummy line
    fgets(linebuf,40,bfile); // data line
    parseline(linebuf,i);
  }
}

int main(void){
  int i,j;
  char yesnobuf[5];
  char *yesno;

  while(1){

    int otherMoved = 1;

    /* SHALL WE PLAY A GAME? */

    printf("Would you like to play a game of Othello? ");
    do{
      yesno = fgets(yesnobuf,4,stdin);      
    }while((yesno==NULL) || (yesnobuf[0]==' ') || (yesnobuf[0]=='\n') || (yesnobuf[0]=='\r'));
    if(tolower(yesnobuf[0])=='y'){
      printf("Yay! You want to play!\n");
    }else{
      printf("Okay, no more Othello...\n");
      break;
    }
  
    /* clear the board */
    for(i=0;i<8;i++){
      for(j=0;j<8;j++){
	b[i][j]=' ';
      }
    }

    /* initialize the board */
    
    b[3][4]='*';
    b[4][3]='*';
    b[3][3]='O';
    b[4][4]='O';
    
    /* uncomment the below function to read in a
     * board to start from. Just cut and paste the
     * complete board from gameplay into this file
     * and it will start the game from there. */

    /* readboard("bfile.dat"); */

    while(!gameover(0)){
      if(canmove(b,'O')){
	otherMoved = 1;
	humanmove('O');
      }
      else{
	if(!otherMoved){
	  gameover(1);
	  break;
	}
	otherMoved = 0;
	printf("No possible move! Skipping your turn...\n");
      }
      if(canmove(b,'*')){
	otherMoved = 1;
	computermove(b,'*');
      }
      else{
	if(!otherMoved){
	  gameover(1);
	  break;
	}
	otherMoved = 0;
	printf("No possible move! Skipping my turn...\n");
      }
    }
    printf("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    printf(" G A M E    O V E R !!!!\n\n\n\n");
  }
  return 0;
}
