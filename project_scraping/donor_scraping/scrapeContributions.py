import urllib.request as req
from bs4 import BeautifulSoup
from os import listdir
import sys

base_link = "https://www.opensecrets.org"
members_link = "https://www.opensecrets.org/members-of-congress/members-list?cong_no=115&cycle=2018"
hdr = {'User-Agent': 'Mozilla/5.0'}
requ = req.Request(members_link,headers=hdr)
f = open('contributions1.csv', 'w', encoding="utf-8")

page = req.urlopen(requ).read()
soup = BeautifulSoup(page, "html.parser")
sys.setrecursionlimit(10000)
results = soup.findAll("table", {"class": "DataTable"})[0].findAll("tr", {"class": "congress-category"})
for rep in results:
    link = rep.find("td").find("a")
    #rep_name = link.contents[0]
    detail_link = base_link + link['href']
    requ = req.Request(detail_link, headers=hdr)
    rep_page = req.urlopen(requ).read()
    rep_soup = BeautifulSoup(rep_page, "html.parser")
    rep_name = rep_soup.find("div", {"class": "Congress--profile-bio-name"}).contents[0]
    contributers = rep_soup.findAll("table")[1].findAll("tr")[1::]
    for cont in contributers:
        cells = cont.findAll("td")
        donor = cells[0].contents[0]
        donation = cells[1].contents[0]
        donation = donation.replace('$', '').replace(',' ,'')
        #print(donor)
        toWrite = rep_name + ";" + donor + ";" + donation + "\n"
        f.write(toWrite)

f.close()

#print(results)
