import express from 'express'
import fetch from 'node-fetch'
const app=express()
const port=3001
app.use(express.static('public'));
app.get("/clinics", async (req,res)=>{
    const states=['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
    const statesMap={
        'Alabama':'AL',
        'Alaska': 'AK' ,
        'American Samoa':'AS',
        'Arizona': 'AZ',
        'Arkansas':'AR',
        'California':'CA',
        'Colorado':'CO',
        'Connecticut':'CT',
        'Delaware':'DE',
        'District of Columbia':'DC',
        'Federated States of Micronesia':'FM',
        'Florida':'FL',
        'Georgia':'GA',
        'Guam':'GU',
        'Hawaii':'HI',
        'Idaho':'ID',
        'Illinois':'IL',
        'Indiana':'IN',
        'Iowa':'IA',
        'Kansas':'KS',
        'Kentucky':'KY',
        'Louisiana':'LA',
        'Maine':'ME',
        'Marshall Islands':'MH',
        'Maryland':'MD',    
        'Massachusetts':'MA',
        'Michigan':'MI',
        'Minnesota':'MN',
        'Mississippi':'MS',
        'Missouri':'MO',
        'Montana':'MT',
        'Nebraska':'NE',
        'Nevada':'NV',
        'New Hampshire':'NH',
        'New Jersey':'NJ',
        'New Mexico':'NM',
        'New York':'NY',
        'North Carolina':'NC',
        'North Dakota':'ND',
        'Northern Mariana Islands':'MP',
        'Ohio':'OH',
        'Oklahoma':'OK',
        'Oregon':'OR',
        'Palau':'PW',
        'Pennsylvania':'PA',
        'Puerto Rico':'PR',
        'Rhode Island':'RI',
        'South Carolina':'SC',
        'South Dakota':'SD',
        'Tennessee':'TN',
        'Texas':'TX',
        'Utah':'UT',
        'Vermont':'VT',
        'Virgin Island':'VI',
        'Virginia':'VA',
        'Washington':'WA',
        'West Virginia':'WV',
        'Wisconsin':'WI',
        'Wyoming':'WY'

    }
    
    const response = await fetch("https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json")
    const data=await response.json()
    const response2= await fetch("https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json")
    const data2=await response2.json()
    const clinicList = data.concat(data2)
    const pageSize=3
    const page=req.query.page
    const startIndex=(page-1)*pageSize
    const endIndex=startIndex+pageSize
    const clinics=clinicList.slice(startIndex,endIndex)
    const entries=clinicList.length-1>endIndex
    switch (true) {
        case req.query.clinic==='' && req.query.state==='' && req.query.from==='' && req.query.to==='':
                
                res.json(clinics)
            
            break
        case req.query.state!=="" || req.query.clinic!==clinicList.clinicName||req.query.clinic!==clinicList.name || req.query.from.substring(0,2)>req.query.to.substring(0,2):
            var error=""
            if(!states.includes(req.query.state) )
            {error="Please check the details entered"}
            res.json(error)
            break
        case states.includes(req.query.state) && req.query.clinic===''&& req.query.from==='' && req.query.to==='':

            var stateValue="", stateKey=""
            for (const [key, value] of Object.entries(statesMap))
            {
                if(req.query.state===key)
                {
                    stateValue=value
                    stateKey=key
                    break
                }
                else if(req.query.state===value){
                    stateValue=value
                    stateKey=key
                    break
                }
            }
            const stateWiseClinic=clinics.filter((clinic)=>{
                return clinic.stateName ===stateKey
            }) 
            const stateWiseClinic1=clinics.filter((clinic)=>{
                return clinic.stateCode === stateValue
            }) 
            const stateClinic=stateWiseClinic.concat(stateWiseClinic1)
            res.json(stateClinic)
            break;
        case req.query.clinic!=='' && req.query.state==='' && req.query.from==='' && req.query.to==='':  
            const nameWiseClinic=clinics.filter((clinic)=>{
                return clinic.name ===req.query.clinic
            }) 
            const nameWiseClinic1=clinics.filter((clinic)=>{
                return clinic.clinicName === req.query.clinic
            }) 
            const nameClinic=nameWiseClinic.concat(nameWiseClinic1)
            res.json(nameClinic)
            break
        case req.query.clinic==='' && req.query.state==='' && req.query.from!=='' && (req.query.to===''||req.query.to!==''):
            const availClinic=clinics.filter((clinic)=>{
                
                if(clinic.availability)
                    return clinic.availability.from.substring(0,2)<=req.query.from.substring(0,2) && clinic.availability.to.substring(0,2)>req.query.to.substring(0,2)
                
            }) 
            const availClinic1=clinics.filter((clinic)=>{
                
                if(clinic.opening)
                    return clinic.opening.from.substring(0,2)<=req.query.from.substring(0,2) && clinic.opening.to.substring(0,2)>req.query.to.substring(0,2)
                
            })
            const avail=availClinic.concat(availClinic1)
            res.json(avail)
            break
        case req.query.clinic==='' && req.query.state!=='' && req.query.from!=='' && (req.query.to===''||req.query.to!==''):
            var stateValue="", stateKey=""
            for (const [key, value] of Object.entries(statesMap))
            {
                if(req.query.state===key)
                {
                    stateValue=value
                    stateKey=key
                    break
                }
                else if(req.query.state===value){
                    stateValue=value
                    stateKey=key
                    break
                }
            }
            const availStateClinic=clinics.filter((clinic)=>{
                
                if(clinic.availability)
                    return clinic.availability.from.substring(0,2)<=req.query.from.substring(0,2) && stateKey===clinic.stateName && clinic.availability.to.substring(0,2)>req.query.to.substring(0,2)
                
            }) 
            const availStateClinic1=clinics.filter((clinic)=>{
                
                if(clinic.opening)
                    return clinic.opening.from.substring(0,2)<=req.query.from.substring(0,2) && stateValue===clinic.stateCode  &&clinic.opening.to.substring(0,2)>req.query.to.substring(0,2)
                
            })
            const availState=availStateClinic.concat(availStateClinic1)
            res.json(availState)
            break
        case req.query.clinic!=='' && req.query.state!=='' && req.query.from!=='' && (req.query.to===''||req.query.to!==''):
            var stateValue="", stateKey=""
            for (const [key, value] of Object.entries(statesMap))
            {
                if(req.query.state===key)
                {
                    stateValue=value
                    stateKey=key
                    break
                }
                else if(req.query.state===value){
                    stateValue=value
                    stateKey=key
                    break
                }
            }
            const allClinic=clinics.filter((clinic)=>{
                
                if(clinic.availability)
                    return clinic.availability.from.substring(0,2)>=req.query.from.substring(0,2) && stateKey===clinic.stateName && req.query.clinic===clinic.name && clinic.availability.to.substring(0,2)>req.query.to.substring(0,2)
                    
                }) 
                const allClinic1=clinics.filter((clinic)=>{
                    
                if(clinic.opening)
                    return clinic.opening.from.substring(0,2)>=req.query.from.substring(0,2) && stateValue===clinic.stateCode && req.query.clinic===clinic.clinicName && clinic.opening.to.substring(0,2)>req.query.to.substring(0,2)
                    
                })
                const allState=allClinic.concat(allClinic1)
                res.json(allState)
                break
        case req.query.clinic!=='' && req.query.state!=='' && req.query.from==='' && (req.query.to===''||req.query.to!==''):
            var stateValue="", stateKey=""
            for (const [key, value] of Object.entries(statesMap))
            {
                if(req.query.state===key)
                {
                    stateValue=value
                    stateKey=key
                    break
                }
                else if(req.query.state===value){
                    stateValue=value
                    stateKey=key
                    break
                }
            }
            const nameStateClinic=clinics.filter((clinic)=>{
                
                if(clinic.availability)
                    return stateKey===clinic.stateName && req.query.clinic===clinic.name
                    
                }) 
                const nameStateClinic1=clinics.filter((clinic)=>{
                    
                if(clinic.opening)
                    return stateValue===clinic.stateCode && req.query.clinic===clinic.clinicName
                    
                })
                const nameState=nameStateClinic.concat(nameStateClinic1)
                res.json(nameState)
            break
        case req.query.clinic!=='' && req.query.state==='' && req.query.from!=='' && (req.query.to===''||req.query.to!==''):
            const nameAvailClinic=clinics.filter((clinic)=>{
                
                if(clinic.availability)
                    return  clinic.availability.from.substring(0,2)<=req.query.from.substring(0,2) && req.query.clinic===clinic.name && clinic.availability.to.substring(0,2)>req.query.to.substring(0,2)
                    
                }) 
                const nameAvailClinic1=clinics.filter((clinic)=>{
                    
                if(clinic.opening)
                    return clinic.opening.from.substring(0,2)<=req.query.from.substring(0,2) && req.query.clinic===clinic.clinicName && clinic.opening.to.substring(0,2)>req.query.to.substring(0,2)
                    
                })
                const nameAvail=nameAvailClinic.concat(nameAvailClinic1)
                res.json(nameAvail)
            break
            
        default:
            break;
    }
    
    
    
})
app.listen(port, ()=>console.log("listening on port 3001"))
