import express from 'express'
import fetch from 'node-fetch'
const app = express()
const port = 3001

async function fetchDentalData() {
    try {
        const response = await fetch("https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const data = await fetchDentalData();

async function fetchVetData() {
    try {
        const response = await fetch("https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json");
        const data2 = await response.json();
        return data2;
    } catch (error) {
        console.error(error);
    }
}
const data2 = await fetchVetData();
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
        //case 1: no user input provides all entries
        case req.query.clinic === '' && req.query.state === '' && req.query.from === '' && req.query.to === '':

            res.json(clinic)
            break
        //case 2: if availabilty from time is not provided then show error message
        case (req.query.clinic === '' && req.query.state === '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic !== '' && req.query.state !== '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic !== '' && req.query.state === '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic === '' && req.query.state !== '' && req.query.from === '' && req.query.to !== ''):
            var error = "Please check the details or spelling entered"

            res.json(error)


            break
        //case 3: user inputs only state
        case req.query.state !== "" && req.query.clinic === '' && req.query.from === '' && req.query.to === '':

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
        //case 4: user inputs only name of the clinic
        case req.query.clinic !== '' && req.query.state === '' && req.query.from === '' && req.query.to === '':
            var error="Please check the details or spelling entered"
            
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
        //case 5: users inputs availabilty only
        case req.query.clinic === '' && req.query.state === '' && req.query.from !== '' && req.query.to !== '':
            var error, regex = "^[0-9]*$"

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
        //case 6: user inputs state and availability
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
                var stateValue = "", stateKey = "", error="Please check the details or spelling entered"
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
                res.json(availState.length===0?error:availState)
            }
            break
        //case 7: user inputs all details EXCEPT availabilty : to time 
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
            const allClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateKey.toLowerCase() === clinic.stateName.toLowerCase() && req.query.clinic.toLowerCase() === clinic.name.toLowerCase() && req.query.from < clinic.availability.to

            })
            const allClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateValue.toLowerCase() === clinic.stateCode.toLowerCase() && req.query.clinic.toLowerCase() === clinic.clinicName.toLowerCase() && req.query.from < clinic.opening.to

            })
            const allState = allClinic.concat(allClinic1)
            res.json(allState.length !== 0 ? allState : error)
            break
        //case 8: user inputs clinic name and state
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
        //case 9: user inputs name of the clinic and availabilty
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
        //case 10: user inputs only from
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
                const availClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.from < clinic.availability.to
                })
                const availClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.from < clinic.opening.to

                })
                const avail = availClinic.concat(availClinic1)
                res.json(avail)
            }
            break

        //case 11: user inputs state and from
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
        //case 12: user inputs all data
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
            const aState = aClinic.concat(aClinic1)
            error = "Please check the details or spelling entered"
            res.json(aState.length !== 0 ? aState : error)
            break

        //case 13: user inputs name and from 
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

                const availStateClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic.toLowerCase() === clinic.name.toLowerCase() && req.query.from < clinic.availability.to //&& clinic.availability.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availStateClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic.toLowerCase() === clinic.clinicName.toLowerCase() && req.query.from < clinic.opening.to //&& clinic.opening.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availState = availStateClinic.concat(availStateClinic1)
                error = "Please check the details or spelling entered"
                res.json(availState.length === 0 ? error : availState)
            }
            break

        default:
            break;
    }
}

app.listen(port, () => console.log("listening on port 3001"))
