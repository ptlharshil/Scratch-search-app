import webdriver from 'selenium-webdriver'
import assert from 'assert'
import { error } from 'console';
(async  ()=>{
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    var By=webdriver.By
    await driver.get('http://localhost:3001');
    
    //case 1
    await driver.sleep(1000)
    await driver.findElement(By.id('searchClinics')).click()
    await driver.sleep(3000)
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

    await state.clear()
    await clinicName.sendKeys("Mayo Clinic")
    await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);

    clinicName.clear()
    await clinicName.sendKeys("mayo clinic")
    await driver.findElement(By.id('searchClinics')).click()
    await driver.wait(webdriver.until.elementIsVisible(clinics), 3000);
    elementsInsideDiv = await clinics.findElements(By.id('results'));
    assert.notEqual(elementsInsideDiv.length,0);

    clinicName.clear()
    await clinicName.sendKeys("mayo 123$")
    await driver.findElement(By.id('searchClinics')).click() 
    assert.strictEqual(error, "Please check the details or spelling entered")
    await driver.sleep(2000)

    clinicName.clear()

    await driver.quit();
})()
