import webdriver, {Builder} from 'selenium-webdriver'
import assert from 'assert'

(async  ()=>{
    var driver = new Builder().forBrowser('chrome').build();
    var By=webdriver.By

    await driver.get('http://localhost:3001');
    

    //case 1
    await driver.sleep(1000)
    await driver.findElement(By.id('searchClinics')).click()
    const clinics=await driver.findElement(By.id('allresults'))
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    var elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.strictEqual(elementsInsideDiv.length,15);

    //case 2
    const to=await driver.findElement(By.id('to'))
    await to.clear()
    await to.sendKeys("12:00")
    await driver.findElement(By.id('searchClinics')).click()
    const errorMsg=await driver.findElement(By.id('errorMsg'))
    const error=await errorMsg.getText()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    const clinicName=await driver.findElement(By.id('clinicName'))
    const state=await driver.findElement(By.id('state'))
    const from=await driver.findElement(By.id('from'))
    await driver.sleep(2000)
    await clinicName.clear()
    await clinicName.sendKeys("Mayo Clinic")
    await state.clear()
    await state.sendKeys("FL")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    await clinicName.clear()
    await clinicName.sendKeys("Scratchpay Pet Clinic")
    await state.clear()
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    await clinicName.clear()
    await state.clear()
    await state.sendKeys("Florida")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    //case 3
    await clinicName.clear()
    await to.clear()
    await from.clear()
    await state.clear()
    await state.sendKeys("Florida")
    await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)

    await state.clear()
    await state.sendKeys("MA")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    await state.clear()
    await state.sendKeys("massaChuseTts")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    await state.clear()
    await state.sendKeys("12@")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    //case 4
    await state.clear()
    await clinicName.sendKeys("Mayo Clinic")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    clinicName.clear()
    await clinicName.sendKeys("mayo clinic")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    clinicName.clear()
    await clinicName.sendKeys("mayo 123$")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    await clinicName.sendKeys("123")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()

    //case 5
    from.clear()
    from.sendKeys("12:00")
    to.clear()
    to.sendKeys("20:00")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    from.clear()
    from.sendKeys(":00")
    to.clear()
    to.sendKeys("20")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("12 am")
    to.clear()
    to.sendKeys("6pm")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("jhsdabf")
    to.clear()
    to.sendKeys("@er")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("4:00")
    to.clear()
    to.sendKeys("2:0")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("14:00")
    to.clear()
    to.sendKeys("12:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("12:00")
    to.clear()
    to.sendKeys("12:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("28:00")
    to.clear()
    to.sendKeys("12:66")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    to.clear()
    from.clear()

    //case 6
    state.clear()
    state.sendKeys("alabama")
    from.sendKeys("12:00")
    to.sendKeys("19:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    state.clear()
    to.clear()
    from.clear()
    state.sendKeys("Fl")
    from.sendKeys("11:00")
    to.sendKeys("18:00")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    state.clear()
    to.clear()
    from.clear()
    state.sendKeys("ca")
    from.sendKeys("11:0")
    to.sendKeys("18:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    state.clear()
    to.clear()
    from.clear()
    state.sendKeys("ubdsf")
    from.sendKeys("11:00")
    to.sendKeys("18:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    
    state.clear()
    to.clear()
    from.clear()
    state.sendKeys("KS")
    from.sendKeys("2pm")
    to.sendKeys("18:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    state.clear()
    to.clear()
    from.clear()
    state.sendKeys("Alaska")
    from.sendKeys("2pm")
    to.sendKeys("1200")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    
    state.clear()
    to.clear()
    from.clear()

    //case 7
    clinicName.sendKeys("Scratchpay Test Pet Medical Center")
    state.sendKeys("Ca")
    from.sendKeys("00:00")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    clinicName.clear()
    state.clear()
    from.clear()
    clinicName.sendKeys("Scratchpay Test Pet Medical")
    state.sendKeys("Ca")
    from.sendKeys("00:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()
    from.clear()
    clinicName.sendKeys("Scratchpay Test Pet Medical")
    state.sendKeys("C")
    from.sendKeys("00:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()
    from.clear()
    clinicName.sendKeys("Scratchpay Test Pet Medical")
    state.sendKeys("Ca")
    from.sendKeys("00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()
    from.clear()
    clinicName.sendKeys("12 Test Pet Medical")
    state.sendKeys("C#")
    from.sendKeys("@@@")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()
    from.clear()

    //case 8:
    clinicName.sendKeys("Mayo CLiniC")
    state.sendKeys("fl")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    clinicName.clear()
    state.clear()
    clinicName.sendKeys("Mayo CLiniC")
    state.sendKeys("CA")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()
    clinicName.sendKeys("@")
    state.sendKeys("AlaBama")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()
    clinicName.sendKeys("Mayo")
    state.sendKeys("PR")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()
    clinicName.sendKeys("02120")
    state.sendKeys("1")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    state.clear()

    //case 9
    clinicName.sendKeys("Good Health Home")
    from.sendKeys("12:00")
    to.sendKeys("12:30")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    clinicName.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Good Health Home")
    from.sendKeys("15:00")
    to.sendKeys("15:30")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    clinicName.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Good Health")
    from.sendKeys("15:00")
    to.sendKeys("15:30")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Good Health Home")
    from.sendKeys("15")
    to.sendKeys("15:30")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Good Health Home")
    from.sendKeys("15pm")
    to.sendKeys("15:")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    clinicName.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Good Health Home")
    from.sendKeys("15:00pm")
    to.sendKeys("15:30")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    
    clinicName.clear()
    from.clear()
    to.clear()

    //case 10
    from.sendKeys("12:00")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    from.clear()
    from.sendKeys("00:00")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    from.clear()
    from.sendKeys("00:00am")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("10am")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("!)AM")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)


    from.clear()
    from.sendKeys("am")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    
    from.clear()

    //case 11
    state.sendKeys("florida")
    from.sendKeys("12:00")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    state.clear()
    from.clear()

    state.sendKeys("california")
    from.sendKeys("12:00")
await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)
    state.clear()
    from.clear()
    state.sendKeys("MASSACHUSETTS")
    from.sendKeys("12pm")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    state.clear()
    from.clear()
    state.sendKeys("12 o clock")
    from.sendKeys("ct")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    state.clear()
    from.clear()

    //case 12
    clinicName.sendKeys("Mayo Clinic")
    state.sendKeys("fl")
    from.sendKeys("15:00")
    to.sendKeys("15:40")
    await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)

    clinicName.clear()
    state.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Mayo Clinic")
    state.sendKeys("fl")
    from.sendKeys("1:00")
    to.sendKeys("15:40")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    clinicName.clear()
    state.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Mayo Clinic")
    state.sendKeys("34")
    from.sendKeys("1:djshbf")
    to.sendKeys("15:40")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    clinicName.clear()
    state.clear()
    from.clear()
    to.clear()
    clinicName.sendKeys("Clinic")
    state.sendKeys("ma")
    from.sendKeys("1")
    to.sendKeys("1")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    clinicName.clear()
    state.clear()
    from.clear()
    to.clear()
    //case 13

    clinicName.sendKeys("good health home")
    from.sendKeys("14:00")
    await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);
    await driver.sleep(2000)

    clinicName.clear()
    from.clear()
    clinicName.sendKeys("good health home")
    from.sendKeys("14:0")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    clinicName.clear()
    from.clear()
    clinicName.sendKeys("good HEALTH home")
    from.sendKeys("00:00")
    await driver.findElement(By.id('searchClinics')).click()
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    await driver.quit();
})()
