import express from 'express'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
const app = express()
dotenv.config()

async function fetchDentalData() {
    try {
        const response = await fetch(process.env.LIST1);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const data = await fetchDentalData();

async function fetchVetData() {
    try {
        const response = await fetch(process.env.LIST2);
        const data2 = await response.json();
        return data2;
    } catch (error) {
        console.error(error);
    }
}
const data2 = await fetchVetData();
//clinic is a list of all the clinics. 
//The APIs are called only once when the application starts and the data is stored in clinic
//In this way we can avoid multiple API calls and the data is rendered with low latency
const clinic = data.concat(data2)

app.use(express.static('public'));

app.get("/clinics", async (req, res) => {

    const states = ['alabama', 'alaska', 'american samoa', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'district of columbia', 'federated states of micronesia', 'florida', 'georgia', 'guam', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'marshall islands', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina', 'north dakota', 'northern Mariana Islands', 'ohio', 'oklahoma', 'oregon', 'palau', 'pennsylvania', 'puerto Rico', 'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virgin island', 'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming',
        'al', 'ak', 'as', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'dc', 'fm', 'fl', 'ga', 'gu', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'mh', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'mp', 'oh', 'ok', 'or', 'pw', 'pa', 'pr', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'vi', 'va', 'wa', 'wv', 'wi', 'wy']
    const statesMap = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'District of Columbia': 'DC',
        'Federated States of Micronesia': 'FM',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam': 'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Marshall Islands': 'MH',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Northern Mariana Islands': 'MP',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Palau': 'PW',
        'Pennsylvania': 'PA',
        'Puerto Rico': 'PR',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virgin Island': 'VI',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'

    }

    filtering(req, res, states, statesMap)

})

function filtering(req, res, states, statesMap) {

    switch (true) {
        //case 1: INPUT: All the fields are empty | OUTPUT: list of all clinics
        case req.query.clinic === '' && req.query.state === '' && req.query.from === '' && req.query.to === '':

            res.json(clinic)
            break
        //case 2: INPUT: the input field of Availability (from) is empty | OUTPUT: Based on the assumption, error
        //message will be displayed
        case (req.query.clinic === '' && req.query.state === '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic !== '' && req.query.state !== '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic !== '' && req.query.state === '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic === '' && req.query.state !== '' && req.query.from === '' && req.query.to !== ''):
            var error = "Please check the details or spelling entered"

            res.json(error)


            break
        //case 3: INPUT: Only the input field of state is provided | OUTPUT: All the clinics in the particular 
        //state will be displayed
        case req.query.state !== "" && req.query.clinic === '' && req.query.from === '' && req.query.to === '':
            //the below for loop helps in converting CA to California and vice versa in order to fetch all
            //the clinics in the state depending on the input provided by the user
            //the data in the APIs have CA in some entries and California in others
            var stateValue = "", stateKey = ""
            for (const [key, value] of Object.entries(statesMap)) {
                if (req.query.state.toLowerCase() === key.toLowerCase() || req.query.state.toLowerCase() === value.toLowerCase()) {
                    stateValue = value
                    stateKey = key
                    break

                }

            }
            const stateWiseClinic = clinic.filter((clinic) => {
                if (clinic.availability) {

                    return clinic.stateName.toLowerCase() === stateKey.toLowerCase()//s=== S
                }
            })
            const stateWiseClinic1 = clinic.filter((clinic) => {
                if (clinic.opening) {

                    return clinic.stateCode.toLowerCase() === stateValue.toLowerCase()
                }
            })

            const stateClinic = stateWiseClinic.concat(stateWiseClinic1)
            var error = "Please check the details or spelling entered"
            res.json(stateClinic.length === 0 ? error : stateClinic)

            break;
        //case 4: INPUT: Only the input field of clinic name is provided | OUTPUT: All the clinics with the particular 
        //clinic name will be displayed
        case req.query.clinic !== '' && req.query.state === '' && req.query.from === '' && req.query.to === '':
            var error = "Please check the details or spelling entered"

            const nameWiseClinic = clinic.filter((clinic) => {
                if (clinic.availability)
                    return clinic.name.toLowerCase() === req.query.clinic.toLowerCase()
            })
            const nameWiseClinic1 = clinic.filter((clinic) => {
                if (clinic.opening)
                    return clinic.clinicName.toLowerCase() === req.query.clinic.toLowerCase()
            })
            const nameClinic = nameWiseClinic.concat(nameWiseClinic1)

            res.json(nameClinic.length === 0 ? error : nameClinic)
            break
        //case 5: INPUT: Only the input fields of availabilty (from and to) are provided | OUTPUT: All the clinics having availabilty
        // in the particular time frame will be displayed
        case req.query.clinic === '' && req.query.state === '' && req.query.from !== '' && req.query.to !== '':
            //the regex makes sure that only numbers are allowed
            var error, regex = "^[0-9]*$"
            //the conditions in the if loop are for ensuring the correct 24 hour format of time is followed
            //Also, basic checks like the "from" time cannot be past/equal the "to" time
            if (req.query.from > req.query.to || req.query.from === req.query.to || req.query.from.length > 5 || req.query.to.length > 5 ||
                req.query.from.substring(2, 3) !== ":" ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)
                || req.query.to.substring(2, 3) !== ":" || req.query.from.length < 5 || req.query.to.length < 5 ||
                req.query.to.substring(0, 2) > 23 || req.query.to.substring(0, 2) < 0 || !req.query.to.substring(0, 2).match(regex)
                || req.query.to.substring(3, 5) > 59 || req.query.to.substring(3, 5) < 0 || !req.query.to.substring(3, 5).match(regex)
            ) {
                error = "Please check the details or spelling entered"
                res.json(error)
            }
            else {
                const availClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.from < clinic.availability.to && clinic.availability.to.substring(0, 2) >= req.query.to.substring(0, 2)
                })
                const availClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.from < clinic.opening.to && clinic.opening.to.substring(0, 2) >= req.query.to.substring(0, 2)

                })
                const avail = availClinic.concat(availClinic1)
                res.json(avail)
            }
            break
        //case 6: INPUT: the user provides the state and his/her availability | OUTPUT: clinics in the particular 
        //sate and with availability as per the users available time frame are returned
        case req.query.clinic === '' && req.query.state !== '' && req.query.from !== '' && req.query.to !== '':
            var error, regex = "^[0-9]*$"
            if (!states.includes(req.query.state.toLowerCase()) || req.query.from.substring(2, 3) !== ":" || req.query.from.length > 5 || req.query.to.length > 5 ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)
                || req.query.from > req.query.to || req.query.from === req.query.to ||
                req.query.to.substring(2, 3) !== ":" || req.query.from.length < 5 || req.query.to.length < 5 ||
                req.query.to.substring(0, 2) > 23 || req.query.to.substring(0, 2) < 0 || !req.query.to.substring(0, 2).match(regex)
                || req.query.to.substring(3, 5) > 59 || req.query.to.substring(3, 5) < 0 || !req.query.to.substring(3, 5).match(regex)
            ) {
                error = "Please check the details or spelling entered"
                res.json(error)
            }
            else {
                var stateValue = "", stateKey = "", error = "Please check the details or spelling entered"
                for (const [key, value] of Object.entries(statesMap)) {
                    if (req.query.state.toLowerCase() === key.toLowerCase()) {
                        stateValue = value
                        stateKey = key
                        break
                    }
                    else if (req.query.state.toLowerCase() === value.toLowerCase()) {
                        stateValue = value
                        stateKey = key
                        break
                    }
                }
                const availStateClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateKey.toLowerCase() === clinic.stateName.toLowerCase() && clinic.availability.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availStateClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateValue.toLowerCase() === clinic.stateCode.toLowerCase() && clinic.opening.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availState = availStateClinic.concat(availStateClinic1)
                res.json(availState.length === 0 ? error : availState)
            }
            break
        //case 7: INPUT: All fields except the availability (to) are provided | OUTPUT: clinic within the state 
        //available during the given time is returned  
        case req.query.clinic !== '' && req.query.state !== '' && req.query.from !== '' && req.query.to === '':
            var error, regex = "^[0-9]*$"
            if (req.query.from.substring(2, 3) !== ":" || req.query.from.length > 5 || req.query.from.length < 5 ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)) {
                error = "Please check the details or spelling entered"
                res.json(error)
                break
            }
            for (let c of clinic) {
                if (req.query.clinic.toLowerCase() !== c.name.toLowerCase() || req.query.clinic.toLowerCase() !== c.clinicName.toLowerCase() || !states.includes(req.query.state)) {
                    error = "Please check the details or spelling entered"
                    break
                }
            }

            var stateValue = "", stateKey = ""
            for (const [key, value] of Object.entries(statesMap)) {
                if (req.query.state.toLowerCase() === key.toLowerCase()) {
                    stateValue = value
                    stateKey = key
                    break
                }
                else if (req.query.state.toLowerCase() === value.toLowerCase()) {
                    stateValue = value
                    stateKey = key
                    break
                }
            }
            const noToClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateKey.toLowerCase() === clinic.stateName.toLowerCase() && req.query.clinic.toLowerCase() === clinic.name.toLowerCase() && req.query.from < clinic.availability.to

            })
            const noToClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateValue.toLowerCase() === clinic.stateCode.toLowerCase() && req.query.clinic.toLowerCase() === clinic.clinicName.toLowerCase() && req.query.from < clinic.opening.to

            })
            const noTo = noToClinic.concat(noToClinic1)
            res.json(noTo.length !== 0 ? noTo : error)
            break
        //case 8: INPUT: user enters the clinic name and the state | OUTPUT: clinic with the name and in the particular state  is displayed
        case req.query.clinic !== '' && req.query.state !== '' && req.query.from === '' && (req.query.to === '' || req.query.to !== ''):
            var error
            for (let c of clinic) {
                if (req.query.clinic !== c.name || req.query.clinic !== c.clinicName || states.includes(req.query.state)) {
                    error = "Please check the details or spelling entered"
                }
            }
            var stateValue = "", stateKey = ""
            for (const [key, value] of Object.entries(statesMap)) {
                if (req.query.state.toLowerCase() === key.toLowerCase()) {
                    stateValue = value
                    stateKey = key
                    break
                }
                else if (req.query.state.toLowerCase() === value.toLowerCase()) {
                    stateValue = value
                    stateKey = key
                    break
                }
            }
            const nameStateClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return stateKey.toLowerCase() === clinic.stateName.toLowerCase() && req.query.clinic.toLowerCase() === clinic.name.toLowerCase()

            })
            const nameStateClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return stateValue.toLowerCase() === clinic.stateCode.toLowerCase() && req.query.clinic.toLowerCase() === clinic.clinicName.toLowerCase()

            })
            const nameState = nameStateClinic.concat(nameStateClinic1)
            res.json(nameState.length !== 0 ? nameState : error)
            break
        //case 9: INPUT: User enters clinic name and availability | OUTPUT: All the clinics from different states 
        //with the same name will be displayed as per the availabilty 
        case req.query.clinic !== '' && req.query.state === '' && req.query.from !== '' && req.query.to !== '':
            var error, regex = "^[0-9]*$"
            if (req.query.from.substring(2, 3) !== ":" || req.query.from.length > 5 || req.query.to.length > 5 || req.query.from.length < 5 || req.query.to.length < 5 ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex) ||
                req.query.from > req.query.to || req.query.from === req.query.to ||
                req.query.to.substring(2, 3) !== ":" ||
                req.query.to.substring(0, 2) > 23 || req.query.to.substring(0, 2) < 0 || !req.query.to.substring(0, 2).match(regex)
                || req.query.to.substring(3, 5) > 59 || req.query.to.substring(3, 5) < 0 || !req.query.to.substring(3, 5).match(regex)) {
                error = "Please check the details or spelling entered"
                res.json(error)
                break
            }

            error = "Please check the details or spelling entered"
            const nameAvailClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic.toLowerCase() === clinic.name.toLowerCase() && clinic.availability.to.substring(0, 2) >= req.query.to.substring(0, 2) && req.query.from < clinic.availability.to

            })
            const nameAvailClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic.toLowerCase() === clinic.clinicName.toLowerCase() && clinic.opening.to.substring(0, 2) >= req.query.to.substring(0, 2) && req.query.from < clinic.opening.to

            })
            const nameAvail = nameAvailClinic.concat(nameAvailClinic1)
            res.json(nameAvail.length !== 0 ? nameAvail : error)
            break
        //case 10: INPUT: User enters availability (from) | OUTPUT: All the clinics that are available as per the input
        // will be displayed
        case req.query.clinic === '' && req.query.state === '' && req.query.from !== '' && req.query.to === '':
            var error, regex = "^[0-9]*$"

            if (req.query.from.length > 5 || req.query.from.length < 5 ||
                req.query.from.substring(2, 3) !== ":" ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)

            ) {
                error = "Please check the details or spelling entered"
                res.json(error)
            }
            else {
                const fromClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.from < clinic.availability.to
                })
                const fromClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.from < clinic.opening.to

                })
                const from = fromClinic.concat(fromClinic1)
                res.json(from)
            }
            break

        //case 11: INPUT: usewr enters state and availabilty (from) | OUTPUT: All the clinics available in the particular
        //state during the availabilty of the user are displayed
        case req.query.clinic === '' && req.query.state !== '' && req.query.from !== '' && req.query.to === '':
            var error, regex = "^[0-9]*$"
            if (!states.includes(req.query.state.toLowerCase()) || req.query.from.substring(2, 3) !== ":" || req.query.from.length > 5 || req.query.from.length < 5 ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)

            ) {
                error = "Please check the details or spelling entered"
                res.json(error)
            }
            else {
                var stateValue = "", stateKey = ""
                for (const [key, value] of Object.entries(statesMap)) {
                    if (req.query.state.toLowerCase() === key.toLowerCase() || req.query.state.toLowerCase() === value.toLowerCase()) {
                        stateValue = value
                        stateKey = key
                        break
                    }

                }
                const availStateClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateKey.toLowerCase() === clinic.stateName.toLowerCase() && req.query.from < clinic.availability.to //&& clinic.availability.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availStateClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateValue.toLowerCase() === clinic.stateCode.toLowerCase() && req.query.from < clinic.opening.to //&& clinic.opening.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availState = availStateClinic.concat(availStateClinic1)
                error = "Please check the details or spelling entered"
                res.json(availState.length === 0 ? error : availState)
            }
            break
        //case 12: INPUT: user inputs all the information | OUTPUT: particular clinic will be displayed subject to the 
        //availability of the clinic. if the clinic is unavailable during the user's available time, it will display error 
        //message
        case req.query.clinic !== '' && req.query.state !== '' && req.query.from !== '' && req.query.to !== '':
            var error, regex = "^[0-9]*$"
            if (req.query.from.substring(2, 3) !== ":" || req.query.from.length > 5 || req.query.from.length < 5 || req.query.to.length > 5 || req.query.to.length < 5 ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex) ||
                req.query.from > req.query.to || req.query.from === req.query.to ||
                req.query.to.substring(2, 3) !== ":" ||
                req.query.to.substring(0, 2) > 23 || req.query.to.substring(0, 2) < 0 || !req.query.to.substring(0, 2).match(regex)
                || req.query.to.substring(3, 5) > 59 || req.query.to.substring(3, 5) < 0 || !req.query.to.substring(3, 5).match(regex)) {
                error = "Please check the details or spelling entered"
                res.json(error)
                break
            }

            var stateValue = "", stateKey = ""
            for (const [key, value] of Object.entries(statesMap)) {
                if (req.query.state.toLowerCase() === key.toLowerCase()) {
                    stateValue = value
                    stateKey = key
                    break
                }
                else if (req.query.state.toLowerCase() === value.toLowerCase()) {
                    stateValue = value
                    stateKey = key
                    break
                }
            }
            const aClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateKey.toLowerCase() === clinic.stateName.toLowerCase() && req.query.clinic.toLowerCase() === clinic.name.toLowerCase() && req.query.from < clinic.availability.to && clinic.availability.to.substring(0, 2) >= req.query.to.substring(0, 2)

            })
            const aClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateValue.toLowerCase() === clinic.stateCode.toLowerCase() && req.query.clinic.toLowerCase() === clinic.clinicName.toLowerCase() && req.query.from < clinic.opening.to && clinic.opening.to.substring(0, 2) >= req.query.to.substring(0, 2)

            })
            const all = aClinic.concat(aClinic1)
            error = "Please check the details or spelling entered"
            res.json(all.length !== 0 ? all : error)
            break

        //case 13: INPUT: User enters name and availabilty (from) | OUTPUT: particular clinic if available duriong 
        //the user's available time will be displayed else error message will be displayed 
        case req.query.clinic !== '' && req.query.state === '' && req.query.from !== '' && req.query.to === '':
            var error, regex = "^[0-9]*$"
            if (req.query.from.substring(2, 3) !== ":" || req.query.from.length > 5 || req.query.from.length < 5 ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)

            ) {
                error = "Please check the details or spelling entered"
                res.json(error)
            }
            else {

                const nameFromClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic.toLowerCase() === clinic.name.toLowerCase() && req.query.from < clinic.availability.to //&& clinic.availability.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const nameFromClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic.toLowerCase() === clinic.clinicName.toLowerCase() && req.query.from < clinic.opening.to //&& clinic.opening.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const nameFrom = nameFromClinic.concat(nameFromClinic1)
                error = "Please check the details or spelling entered"
                res.json(nameFrom.length === 0 ? error : nameFrom)
            }
            break

        default:
            break;
    }
}

app.listen(process.env.PORT, () => console.log("listening"))
