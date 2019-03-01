import json

candidate = open('candidates.csv', 'w')
p_id = 0

with open('current_senators.json') as f:
    data = json.load(f)
    members = data['results'][0]['members']
    for member in members:
        line = ""
        line = line + str(p_id) + ', '
        line = line + member['first_name'] + ', '
        line = line + member['last_name'] + ', '
        line = line + "true" + ', '
        line = line + member['state'] + ', '
        line = line + member['gender'] + ', '
        line = line + member['party'] + ', '
        line = line + member['fec_candidate_id'] + ', '
        line = line + member['state_rank'] + ', '
        line = line + 'N/A' + ', '
        line = line + member['govtrack_id'] + '\n'
        p_id += 1
        candidate.write(line)

with open('current_representatives.json') as f:
    data = json.load(f)
    members = data['results'][0]['members']
    for member in members:
        line = ""
        line = line + str(p_id) + ', '
        line = line + member['first_name'] + ', '
        line = line + member['last_name'] + ', '
        line = line + "false" + ', '
        line = line + member['state'] + ', '
        line = line + member['gender'] + ', '
        line = line + member['party'] + ', '
        line = line + member['fec_candidate_id'] + ', '
        line = line + 'N/A' + ', '
        line = line + member['district'] + ', '
        try:
            line = line + member['govtrack_id'] + '\n'
        except:
            line = line + "Unknown" + '\n'
        p_id += 1
        candidate.write(line)

candidate.close()
    
