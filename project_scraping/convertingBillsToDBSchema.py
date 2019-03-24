import json

bills_csv = open('bills.csv', 'w', encoding="utf-8")
p_id = 0

with open('recent_bills_passed.json') as f:
    data = json.load(f)
    bills = data['results'][0]['bills']
    for bill in bills:
        line = ""
        line = line + str(p_id) + '; '
        line = line + bill['title'] + '; '
        line = line + bill['govtrack_url'] + '; '
        line = line + bill['introduced_date'] + '; '
        if(bill['last_vote'] == None):
            line = line + "N/A" + '; '
        else:
            line = line + bill['last_vote'] + '; '
        line = line + bill['bill_id'] + '; '
        line = line + str(bill['active']) + '; '
        line = line + bill['sponsor_name'] + '; '
        line = line + bill['bill_type'] + '; '
        if(bill['committees'] == ""):
            line = line + "N/A" + '\n'
        else:
            line = line + bill['committees'] + '\n'
        p_id += 1
        bills_csv.write(line)

bills_csv.close()
    
