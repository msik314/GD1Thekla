import csv

timeStamp=[]
playerInput=[]
direction=[]

with open('tk30stimestamp.csv') as csvfile:
    readCSV=csv.reader(csvfile,delimiter=',')
    for row in readCSV:
        timeStamp.append(row[0])
        playerInput.append(row[1])
        if(len(row)>2):
            if(row[2]!=0 or row[2]!=1 or row[2]!=2 or row[2]!=3):
                direction.append(-1)
            else:
                direction.append(row[2]) 
        else:
            direction.append(-1)
        
text=""
for i in range(len(timeStamp)-1):
    text+=str(timeStamp[i])+" "
text+=str(timeStamp[len(timeStamp)-1])
text+="\n"
for i in range(len(playerInput)-1):
    text+=str(playerInput[i])+" "
text+=str(playerInput[len(playerInput)-1])
text+="\n"
for i in range(len(direction)-1):
    text+=str(direction[i])+" "
text+=str(direction[len(direction)-1])

with open('lvl1timestamp.txt', 'w') as f:
    f.write(text)
f.close()

timeStamp=[]
playerInput=[]
direction=[]

with open('tk60stimestamp.csv') as csvfile:
    readCSV=csv.reader(csvfile,delimiter=',')
    for row in readCSV:
        timeStamp.append(row[0])
        playerInput.append(row[1])
        if(row[2]!=0 or row[2]!=1 or row[2]!=2 or row[2]!=3):
            direction.append(-1)
        else:
            direction.append(row[2])
        
text=""
for i in range(len(timeStamp)-1):
    text+=str(timeStamp[i])+" "
text+=str(timeStamp[len(timeStamp)-1])
text+="\n"
for i in range(len(playerInput)-1):
    text+=str(playerInput[i])+" "
text+=str(playerInput[len(playerInput)-1])
text+="\n"
for i in range(len(direction)-1):
    text+=str(direction[i])+" "
text+=str(direction[len(direction)-1])

with open('lvl2timestamp.txt', 'w') as f:
    f.write(text)
f.close()

timeStamp=[]
playerInput=[]
direction=[]

with open('tk90stimestamp.csv') as csvfile:
    readCSV=csv.reader(csvfile,delimiter=',')
    for row in readCSV:
        timeStamp.append(row[0])
        playerInput.append(row[1])
        if(row[2]!=0 or row[2]!=1 or row[2]!=2 or row[2]!=3):
            direction.append(-1)
        else:
            direction.append(row[2])
        
text=""
for i in range(len(timeStamp)-1):
    text+=str(timeStamp[i])+" "
text+=str(timeStamp[len(timeStamp)-1])
text+="\n"
for i in range(len(playerInput)-1):
    text+=str(playerInput[i])+" "
text+=str(playerInput[len(playerInput)-1])
text+="\n"
for i in range(len(direction)-1):
    text+=str(direction[i])+" "
text+=str(direction[len(direction)-1])

with open('lvl3timestamp.txt', 'w') as f:
    f.write(text)
f.close()