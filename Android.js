var wd = require("wd")
var assert  = require("assert");
var asserter = wd.asserters;

username = (process.env.LT_USERNAME == undefined) ? "username" //Enter the username here
        : process.env.LT_USERNAME
accesskey = (process.env.LT_ACCESS_KEY == undefined) ? "access_key" //Enter the access_key here
        : process.env.LT_ACCESS_KEY

desired_capabilities = {
    'deviceName':'Galaxy S20',
    'platformVersion':'11',
    'platformName':'android',
    'isRealMobile':true,
    'app':'lt://', //Enter the app_url here
    'visual':true,
    'video': true,

    //GRANT PERMISSIONS FOR ANDROID
    'autoGrantPermissions': true,
    
}

driver = wd.promiseRemote(`https://${username}:${accesskey}@mobile-hub.lambdatest.com/wd/hub`)

async function Androidtest(){

try {

driver.init(desired_capabilities)
.then(function(){
    return driver.waitForElementById('color',10000)
})
.then(function(colorButton){
    return colorButton.click();
})
.then(function(){
    return driver.waitForElementById('Text',10000)
})
.then(function(text){
    text.click()
    return driver.waitForElementById('toast',10000)
})
.then(function(toast){
    toast.click()
    return driver.waitForElementById('notification',10000)
})

.then(function(find){
    find.click()
    driver.quit()
})

}
catch (e) {
    driver.quit()
}
}

Androidtest(); 