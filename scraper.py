import requests
from bs4 import BeautifulSoup

import json

template_url = 'https://dq.cde.ca.gov/dataquest/Enrollment/EthnicEnr.aspx?cType=ALL&cGender=B&cYear={startyear}-{endyear}&Level=School&cSelect=Lowell+High--San+Francisco+U--3868478-3833407&cChoice=SchEnrEth'

races = ['African American', 'Asian', 'White', 'American Indian or Alaska Native', 'Pacific Islander', 'Filipino', 'Hispanic']

data = {}

for year in range(1993, 2018):
    data[year] = {}

    soup = BeautifulSoup(requests.get(template_url.format(startyear=year, endyear=str(year + 1)[2:])).text, 'html.parser')

    table = soup.find('table')

    tds = table.find_all('td')[2:]
    ths = table.find_all('th')[2:]
    for th in ths:
        for race in races:
            if race in th.text.strip():
                data[year][race] = int(tds[ths.index(th)].text.strip().replace(',', ''))
                break

with open('data.json', 'w') as file:
    json.dump(data, file)
