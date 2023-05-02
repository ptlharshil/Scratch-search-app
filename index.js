import express, { query, response } from 'express'
import fetch from 'node-fetch'
const app = express()
const port = 3001
app.use(express.static('public'));
app.get("/clinics", async (req, res) => {
    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
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
    const response = await fetch("https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json")//.then(response=>response.json()).then(data=>{ chunk=data})
    const data = await response.json()

    const response2 = await fetch("https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json")//.then(response=>response.json()).then(data=>{ chunk2=data})
    const data2 = await response2.json()
    const clinic = data.concat(data2)
    var dataLength

    switch (true) {
        case req.query.clinic === '' && req.query.state === '' && req.query.from === '' && req.query.to === '':

            res.json(clinic)

            break
        case (req.query.clinic === '' && req.query.state === '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic !== '' && req.query.state !== '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic !== '' && req.query.state === '' && req.query.from === '' && req.query.to !== '')
            || (req.query.clinic === '' && req.query.state !== '' && req.query.from === '' && req.query.to !== ''):
            var error = "Please check the details or spelling (case-sensitive) entered"

            res.json(error)


            break
        case states.includes(req.query.state) && req.query.clinic === '' && req.query.from === '' && req.query.to === '':

            var stateValue = "", stateKey = ""
            for (const [key, value] of Object.entries(statesMap)) {
                if (req.query.state === key) {
                    stateValue = value
                    stateKey = key
                    break
                }
                else if (req.query.state === value) {
                    stateValue = value
                    stateKey = key
                    break
                }
            }
            const stateWiseClinic = clinic.filter((clinic) => {
                return clinic.stateName === stateKey
            })
            const stateWiseClinic1 = clinic.filter((clinic) => {
                return clinic.stateCode === stateValue
            })
            const stateClinic = stateWiseClinic.concat(stateWiseClinic1)

            dataLength = stateClinic.length
            res.json(stateClinic)
            break;
        case req.query.clinic !== '' && req.query.state === '' && req.query.from === '' && req.query.to === '':
            var error
            for (let c of clinic) {
                if (req.query.clinic !== c.name || req.query.clinic !== c.clinicName) {
                    error = "Please check the details or spelling (case-sensitive) entered"
                }
            }
            const nameWiseClinic = clinic.filter((clinic) => {
                return clinic.name === req.query.clinic
            })
            const nameWiseClinic1 = clinic.filter((clinic) => {
                return clinic.clinicName === req.query.clinic
            })
            const nameClinic = nameWiseClinic.concat(nameWiseClinic1)

            res.json(nameClinic.length === 0 ? error : nameClinic)
            break
        case req.query.clinic === '' && req.query.state === '' && req.query.from !== '' && (req.query.to === '' || req.query.to !== ''):
            var error, regex = "^[0-9]*$"

            if (req.query.from.substring(2, 3) !== ":" ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)
            ) {
                error = "Please check the details or spelling (case-sensitive) entered"
                res.json(error)
            }
            else {
                const availClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2)
                })
                const availClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2)

                })
                const avail = availClinic.concat(availClinic1)
                res.json(avail)
            }
            break
        case req.query.clinic === '' && req.query.state !== '' && req.query.from !== '' && (req.query.to === '' || req.query.to !== ''):
            var error, regex = "^[0-9]*$"
            if (!states.includes(req.query.state) || req.query.from.substring(2, 3) !== ":" ||
                req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)
            ) {
                error = "Please check the details or spelling (case-sensitive) entered"
                res.json(error)
            }
            else {
                var stateValue = "", stateKey = ""
                for (const [key, value] of Object.entries(statesMap)) {
                    if (req.query.state === key) {
                        stateValue = value
                        stateKey = key
                        break
                    }
                    else if (req.query.state === value) {
                        stateValue = value
                        stateKey = key
                        break
                    }
                }
                const availStateClinic = clinic.filter((clinic) => {

                    if (clinic.availability)
                        return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateKey === clinic.stateName && clinic.availability.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availStateClinic1 = clinic.filter((clinic) => {

                    if (clinic.opening)
                        return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateValue === clinic.stateCode && clinic.opening.to.substring(0, 2) > req.query.to.substring(0, 2)

                })
                const availState = availStateClinic.concat(availStateClinic1)
                res.json(availState)
            }
            break
        case req.query.clinic !== '' && req.query.state !== '' && req.query.from !== '' && req.query.to === '':
            var error, regex = "^[0-9]*$"
            for (let c of clinic) {
                if (req.query.clinic !== c.name || req.query.clinic !== c.clinicName || !states.includes(req.query.state) ||
                    req.query.from.substring(2, 3) !== ":" ||
                    req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                    || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex)) {
                    error = "Please check the details or spelling (case-sensitive) entered"
                }
            }

            var stateValue = "", stateKey = ""
            for (const [key, value] of Object.entries(statesMap)) {
                if (req.query.state === key) {
                    stateValue = value
                    stateKey = key
                    break
                }
                else if (req.query.state === value) {
                    stateValue = value
                    stateKey = key
                    break
                }
            }
            const allClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateKey === clinic.stateName && req.query.clinic === clinic.name && req.query.from < clinic.availability.to

            })
            const allClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && stateValue === clinic.stateCode && req.query.clinic === clinic.clinicName && req.query.from < clinic.opening.to

            })
            const allState = allClinic.concat(allClinic1)
            res.json(allState.length !== 0 ? allState : error)
            break

        case req.query.clinic !== '' && req.query.state !== '' && req.query.from === '' && (req.query.to === '' || req.query.to !== ''):
            var error
            for (let c of clinic) {
                if (req.query.clinic !== c.name || req.query.clinic !== c.clinicName || !states.includes(req.query.state)) {
                    error = "Please check the details or spelling (case-sensitive) entered"
                }
            }
            var stateValue = "", stateKey = ""
            for (const [key, value] of Object.entries(statesMap)) {
                if (req.query.state === key) {
                    stateValue = value
                    stateKey = key
                    break
                }
                else if (req.query.state === value) {
                    stateValue = value
                    stateKey = key
                    break
                }
            }
            const nameStateClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return stateKey === clinic.stateName && req.query.clinic === clinic.name

            })
            const nameStateClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return stateValue === clinic.stateCode && req.query.clinic === clinic.clinicName

            })
            const nameState = nameStateClinic.concat(nameStateClinic1)
            res.json(nameState.length !== 0 ? nameState : error)
            break
        case req.query.clinic !== '' && req.query.state === '' && req.query.from !== '' && (req.query.to === '' || req.query.to !== ''):
            var error, regex = "^[0-9]*$"
            for (let clinic of clinic) {
                if (req.query.clinic !== clinic.name || req.query.clinic !== clinic.clinicName || req.query.from.substring(2, 3) !== ":" ||
                    req.query.from.substring(0, 2) > 23 || req.query.from.substring(0, 2) < 0 || !req.query.from.substring(0, 2).match(regex)
                    || req.query.from.substring(3, 5) > 59 || req.query.from.substring(3, 5) < 0 || !req.query.from.substring(3, 5).match(regex) ||
                    req.query.to.substring(2, 3) !== ":" ||
                    req.query.to.substring(0, 2) > 23 || req.query.to.substring(0, 2) < 0 || !req.query.to.substring(0, 2).match(regex)
                    || req.query.to.substring(3, 5) > 59 || req.query.to.substring(3, 5) < 0 || !req.query.to.substring(3, 5).match(regex)) {
                    error = "Please check the details or spelling (case-sensitive) entered"
                }
            }
            const nameAvailClinic = clinic.filter((clinic) => {

                if (clinic.availability)
                    return clinic.availability.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic === clinic.name && clinic.availability.to.substring(0, 2) > req.query.to.substring(0, 2)

            })
            const nameAvailClinic1 = clinic.filter((clinic) => {

                if (clinic.opening)
                    return clinic.opening.from.substring(0, 2) <= req.query.from.substring(0, 2) && req.query.clinic === clinic.clinicName && clinic.opening.to.substring(0, 2) > req.query.to.substring(0, 2)

            })
            const nameAvail = nameAvailClinic.concat(nameAvailClinic1)
            res.json(nameAvail.length !== 0 ? nameAvail : error)
            break

        default:

            break;
    }



})
app.listen(port, () => console.log("listening on port 3001"))
