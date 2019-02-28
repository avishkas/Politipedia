import requests
import json

param = {'X-API-Key':'BZ2lHb5pD8yTiUGV9jqbSZYsT6aCZfpVPwFmmzWd'}

def propublica_scrape(base_url, file_name):
    r = requests.get(url = base_url, headers = param)
    data = r.json()
    with open(file_name, 'w') as outfile:
        json.dump(data, outfile)

#Current Senators
#propublica_scrape("https://api.propublica.org/congress/v1/115/senate/members.json", "current_senators.json")

#Current Representatives
#propublica_scrape("https://api.propublica.org/congress/v1/115/house/members.json", "current_representatives.json")

#Most recent bills passed
#propublica_scrape("https://api.propublica.org/congress/v1/115/house/bills/passed.json", "recent_bills_passed.json")




