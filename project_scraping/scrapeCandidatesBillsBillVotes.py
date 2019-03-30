import urllib.request as req
from bs4 import BeautifulSoup
from os import listdir

def scrape_govtrack_bills_votes(): 
    bills_page = "https://www.govtrack.us/congress/votes#category[]=2,3"

    soup = BeautifulSoup(open("C:\\Users\\ashwi\\Desktop\\Classes\\Semester_6_Classes\\Software_Lab\\Final Project\\Politipedia\\project_scraping\\GovTrackBills2019.html", encoding="utf-8"), "html.parser")
    #page = req.urlopen(bills_page).read()
    #soup = BeautifulSoup(page, "html.parser")

    results = soup.findAll("div", {"class": "results"})[0].findAll("div", {"class": "result_item"})
    p_id = 0
    f = open('govtrackBills.csv', 'w', encoding="utf-8")

    for result in results:
        link = result.findAll("a")[0]['href']
        votePage = req.urlopen(link).read()
        votePageSoup = BeautifulSoup(votePage, "html.parser")
        billLink = votePageSoup.findAll("div", {"id": "vote_explainer"})[0].findAll("a")[0]['href']
        #print(billLink)
        if("members" in billLink or "http" in billLink):
            continue
        base = "https://www.govtrack.us"
        billLink = base + billLink
        billPage = req.urlopen(billLink).read()
        billPageSoup = BeautifulSoup(billPage, "html.parser")

        ### Scrape fields
        title = billPageSoup.findAll("div", {"class": "h1-multiline"})[0].find("h1").contents[0]
        sponsor_name = billPageSoup.findAll("a", {"class": "name"})[0].contents[0]
        #print(title)
        
        billOverviewElement = billPageSoup.findAll("div", {"id": "bill-overview-panel"})[0].findAll("dd")[1]
        pars = billOverviewElement.findAll("p")
        try:
            introduced_date = pars[0].findAll("strong")[1].contents[0]
        except:
            continue
        status = pars[1].contents[0]

        line = str(p_id) + "; " + title + "; " + sponsor_name + "; " + introduced_date + "; " + status + "\n"
        f.write(line)
        p_id = p_id + 1

        #csvLink = votePageSoup.find("div", {"id": "vote_notes"}).findAll("a")[3]['href']
        csvLink = link + "/export/csv"
        splits = link.split("/")
        #print(splits)
        name = "votes_" + splits[5] + "_" + splits[6] + ".csv"
        file = open("voteCsvs/" + name, "wb")
        #print(name)
        file.write(req.urlopen(csvLink).read())

    f.close()

def formatRepsAndSenators():
    orig = open('congress_votes_116-2019_h135.csv', 'r', encoding="utf-8")
    mod = open('congress.csv', 'w', encoding="utf-8")

    line = orig.readline()
    line = orig.readline()
    mod.write("id,"+line)
    p_id = 0
    for line in orig:
        mod_line = str(p_id) + "," + line.replace("Rep. ", "").replace(" [R]", "").replace(" [D]", "").replace(" [I]", "")
        mod.write(mod_line)
        #cols = line.split(",")
        #mod_line = str(p_id) + cols[0] + cols[1] + cols[2] + cols[3].mod + cols[4]
        p_id = p_id + 1
    #print(line)

    orig = open('congress_votes_116-2019_s48.csv', 'r', encoding="utf-8")

    line = orig.readline()
    line = orig.readline()

    for line in orig:
        mod_line = str(p_id) + "," + line.replace("Sen. ", "").replace(" [R]", "").replace(" [D]", "").replace(" [I]", "")
        mod.write(mod_line)
        #cols = line.split(",")
        #mod_line = str(p_id) + cols[0] + cols[1] + cols[2] + cols[3].mod + cols[4]
        p_id = p_id + 1
    #print(line)
    mod.close()

def formatSenators():
    orig = open('congress_votes_116-2019_s48.csv', 'r', encoding="utf-8")
    mod = open('sens.csv', 'w', encoding="utf-8")

    line = orig.readline()
    line = orig.readline()
    mod.write("id,"+line)
    p_id = 0
    for line in orig:
        mod_line = str(p_id) + "," + line.replace("Sen. ", "").replace(" [R]", "").replace(" [D]", "").replace(" [I]", "")
        mod.write(mod_line)
        #cols = line.split(",")
        #mod_line = str(p_id) + cols[0] + cols[1] + cols[2] + cols[3].mod + cols[4]
        p_id = p_id + 1
    #print(line)
    mod.close()

def linkBillsAndCandidates():
    #build p_id to bill name map
    billToId = {}
    fileNames = listdir("voteCsvs")
    bills = open("govtrackBills.csv", "r", encoding="utf-8")
    for line in bills:
        lineSplit = line.split(";")
        beg = lineSplit[1].split(":")[0][1::]
        billToId[beg] = lineSplit[0]

    congress_billvote = open("congress_billvote.csv", "w", encoding = "utf-8")
    congress_billvote.write("candidate_id,bill_id,vote\n")
    
    for file in fileNames:
        f = open("voteCsvs/" + file, "r", encoding="utf-8")
        firstLine = f.readline()
        bill = firstLine.split(" - ")[1].split(":")[0]
        billId = billToId[bill]
        f.readline()
        for line in f:
            candidate_id = line.split(",")[0]
            toWrite = candidate_id + "," + billId + "," + line.split(",")[3] + "\n"
            congress_billvote.write(toWrite)    
        #print(firstLine, billId)

    congress_billvote.close()
        
    


#formatReps()
#scrape_govtrack_bills_votes()
#formatRepsAndSenators()
linkBillsAndCandidates()
