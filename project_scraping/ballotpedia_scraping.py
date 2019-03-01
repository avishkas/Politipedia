import urllib.request as req
from bs4 import BeautifulSoup

page = req.urlopen('https://ballotpedia.org/United_States_Congress_elections,_2018').read()
soup = BeautifulSoup(page)

senate_and_house_tables = []
senate = ""
house = ""

for table in soup.find_all('table', attrs={'class': 'bptable'}):
    #print(table)
    #print(table.find("tr").find("th").contents[0])
    if("United States Senate" in table.find("tr").find("th").contents[0]):
        senate = table
    if("United States House" in table.find("tr").find("th").contents[0]):
        house = table
    #for row in table.get("tr"):
    #    for col in table.get("td"):
    #        print(col)

f = open("senate_race.csv", "w")

for row in senate.find_all("tr")[2::]:
    f_row = ""
    cols = row.find_all("td")

    f_row = f_row + cols[0].contents[1].contents[0] + ", "
    
    try:
        f_row = f_row + cols[1].contents[2].contents[0] + ", "
    except:
        f_row = f_row + cols[1].contents[3].contents[0] + ", "

    try:
        f_row = f_row + cols[2].contents[2].contents[0] + "\n"
    except:
        f_row = f_row + cols[2].contents[3].contents[0] + "\n"

    print(f_row)
    f.write(f_row)

f.close()

f = open("house_race.csv", "w")

for row in house.find_all("tr")[2::]:
    f_row = ""
    cols = row.find_all("td")

    f_row = f_row + cols[0].contents[1].contents[0] + ", "
    
    try:
        f_row = f_row + cols[1].contents[2].contents[0] + ", "
    except:
        f_row = f_row + cols[1].contents[3].contents[0] + ", "

    try:
        f_row = f_row + cols[2].contents[2].contents[0] + "\n"
    except:
        try:
            f_row = f_row + cols[2].contents[3].contents[0] + "\n"
        except:
            continue

    print(f_row)
    f.write(f_row)

f.close()

#print(senate)
#print(house)

#for table in senate_and_house_tables:
#    f_row = ""
#    for row in table.find_all("tr"):
#        for col in row.find_all("td"):
#            print(col.contents[1])
#            f_row = f_row + col.contents[1].contents[0] + ","
#    print(f_row)

#print(senate_and_house_tables)
