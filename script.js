function initialize()
{
  //Analysis Portion
  numBasicOut = document.getElementById("numBasic");
  numCompOut = document.getElementById("numComp");
  numSuckerOut = document.getElementById("numSucker");
  
  bestPlanOut = document.getElementById("bestPlan");
  worstPlanOut = document.getElementById("worstPlan");
  
  bestPercentOut = document.getElementById("bestPercent");
  notBestOut = document.getElementById("notBest");
  
  avgOverpayOut = document.getElementById("avgOverpay");

  unlimitedPlanOut = document.getElementById("unlimitedPlan");

  numBasicCustomers = 0;
  numComprehensiveCustomers = 0;
  numSuckerCustomers = 0;
  numUnlimtedCustomers = 0;

  totalBasicCost = 0;
  totalCompCost = 0;
  totalSuckerCost = 0;

  totalActualCost = 0;

  numCustomersUltimateBestFor = 0;
    
  //Creating Data Portion with Table
  dataTableOut = document.getElementById("datatable");
  enterData();
  display();
}

//This is the display that shows the "Analysis of the Customer Phone Plan Data" information
function display()
{
  numBasicOut.innerHTML = "The number of customers using the Basic Plan: " + numBasicCustomers;
  numCompOut.innerHTML = "The number of customers using the Comprehensive Plan: " + numComprehensiveCustomers;
  numSuckerOut.innerHTML = "The number of customers using the Sucker Plan: " + numSuckerCustomers;
  
  bestPlanOut.innerHTML = "The best plan for Disjunction Wireless is (Cheapest for the customer): " + getSmallestCost();
  worstPlanOut.innerHTML = "The worst plan for Disjunction Wireless is (Most expensive for the customer): " + getLargestCost();

  bestPercentOut.innerHTML = "The percentage of customers using the Best Plan is: " + perCustomersUsingBestPlan() + "%";
  notBestOut.innerHTML = "The percentage of customers not using the Best Plan is: " + perCustomersNotUsingBestPlan() +"%";
  
  avgOverpayOut.innerHTML = "The average overpayment is $" + calculateOverpayment();

  unlimitedPlanOut.innerHTML = "Percentage of customers that the unlimited plan work best as a replacement for their current plan: " + numCustomersUltimateBestFor/10 + "%";
}

//The getSmallestCost() function determines what the best plan is. Subtracts what the total cost would be if all customers used that plan from the total actual cost. Returns the amount the average customer overpays.
function calculateOverpayment()
{
  //EcmaScript 6
  let theBestPlan = getSmallestCost();
  let totalBestCost = 0;
  if(theBestPlan == "Basic")
  {
    totalBestCost = totalBasicCost;
  }
  if(theBestPlan == "Comprehensive")
  {
    totalBestCost = totalCompCost;
  }
  if(theBestPlan == "Sucker")
  {
    totalBestCost = totalSuckerCost;
  }
  var overpayment = totalActualCost - totalBestCost;
  overpayment = overpayment/1000;
  return overpayment.toFixed(2);
}

//Returns what plan will cost the most for all customers. It tests out total price combinations of two phone plans and checks which plan has largest cost.
function getLargestCost()
{
  if(totalBasicCost >= totalCompCost && totalBasicCost >= totalSuckerCost)
  {
    return "Basic";
  }
  else if(totalCompCost >= totalBasicCost && totalCompCost >= totalSuckerCost)
  {
    return "Comprehensive";
  }
  else
  {
    return "Sucker";
  }
}

//Determines and returns what plan will cost the least for all customers. It tests out total price combinations of two phone plans and checks which plan has smallest cost.
function getSmallestCost()
{
  if(totalBasicCost <= totalCompCost && totalBasicCost <= totalSuckerCost)
  {
    return "Basic";
  }
  else if(totalCompCost <= totalBasicCost && totalCompCost <= totalSuckerCost)
  {
    return "Comprehensive";
  }
  else
  {
    return "Sucker";
  }
}

//Using what will cost the least the customers (and thus be the best plan), determines and returns what the percentage of customers using that best plan is.
function perCustomersUsingBestPlan()
{
  var bestPlan = getSmallestCost();
  if(bestPlan == "Basic")
  {
    return numBasicCustomers/10;
  }
  else if(bestPlan == "Comprehensive")
  {
    return numComprehensiveCustomers/10;
  }
  else
  {
    return numSuckerCustomers/10;
  }
}

//Using the percentage of customers using the best plan function, determines and returns what the percentage of customers not using the best plan is.
function perCustomersNotUsingBestPlan()
{
  var perBestPlan = perCustomersUsingBestPlan();
  return 100-perBestPlan;
}

//Basic function to be used extensively in other functions
function getRandomInteger(lower, upper)
{
  var multiplier = upper - (lower -1);
  var rnd = parseInt(Math.random() * multiplier) + lower;
  return rnd;
}

//Will generate and return a valid phone number for each customer as needed.
function generatePhoneNumber()
{
  //generate number
  //var phoneNumber = Math.floor(Math.random() * 9999999999) + 100000000;
  var phoneNumber = "";
  var randomDigitNotZero = getRandomInteger(1, 9);
  phoneNumber += randomDigitNotZero;

  for(var i=0; i<9; i++)
  {
    var k = getRandomInteger(0, 9);
    phoneNumber += k;
  }
  
  return phoneNumber;
}

//Will randomly generate a number between 1 and 40,000 for each customer as needed. This number will represent the number of megabytes that the customer has used.
function generateMb()
{
  var megaBytes = getRandomInteger(1, 40000);
  return megaBytes;
}

//Will randomly pick one of three plans (Basic, Comprehensive and Sucker) and assign it to the given customer.
//Uses EcmaScript6
function generateDataPlan()
{
  const dataplans = ["Basic", "Comprehensive", "Sucker"];
  const random = Math.floor(Math.random() * dataplans.length);
  return dataplans[random];
}

//Calculates the cost for the customer if they possessed a basic plan.
function billBasicPlan(num)
{
  mbOverOne = num-1000;
  if(mbOverOne < 0)
  {
    return 19.99;
  }
  else
  {
    var total = 19.99;
    total += mbOverOne*0.10;
    return total.toFixed(2);
  } 
}

//Calculates the cost for the customer if they possessed a comprehensive plan.
function billComprehensivePlan(num)
{
  mbOverFour = num-4000;
  if(mbOverFour < 0)
  {
    return 24.99;
  }
  else
  {
    var total = 24.99;
    total += mbOverFour*0.25;
    return total.toFixed(2);
  }  
}

//Calculates the cost for the customer if they possessed a sucker plan.
function billSuckerPlan(num)
{
  var total = 4.99;
  total += num*0.02;
  return total.toFixed(2);
}

//Generates the table of customer phone plan data.
function enterData()
{
  //Creates 1000 customers
  var customers = 1000;

  //iterates through each customer
  for (var i = 0; i < customers; i++) 
  {
    var newRow = dataTableOut.insertRow();
    
    //Numbers each customer
    var newCell0 = newRow.insertCell();
    newCell0.innerHTML = i+1 + ".";
    
    //Generates a unique phone number for each customer
    var newCell = newRow.insertCell();
    var phoneNum = generatePhoneNumber();
    newCell.innerHTML = phoneNum;
    
    //Assigns a randomly generated number of MB used for each customer
    var newCell2 = newRow.insertCell();
    var numofMB = generateMb();
    newCell2.innerHTML = numofMB;
    
    //Assigns a data plan for each customer
    var newCell3 = newRow.insertCell();
    var chosenDataPlan = generateDataPlan();
    
    //Counts number of Basic customers as well as adding the cost to the total actual cost. Also, determines whether the basic customer would pay more or less with a ultimate plan.
    if(chosenDataPlan == "Basic")
    {
      numBasicCustomers += 1;
      totalActualCost += parseInt(billBasicPlan(numofMB));

      if(parseInt(billBasicPlan(numofMB)) > 49.99)
      {
        numCustomersUltimateBestFor++;
      }
    }

    //Counts number of Comprehensive customers as well as adding the cost to the total actual cost. Also, determines whether the Comprehensive customer would pay more or less with a ultimate plan.
    if(chosenDataPlan == "Comprehensive")
    {
      numComprehensiveCustomers += 1;
      totalActualCost += parseInt(billComprehensivePlan(numofMB));

      if(parseInt(billComprehensivePlan(numofMB)) > 49.99)
      {
        numCustomersUltimateBestFor++;
      }
    }

    //Counts number of Sucker customers as well as adding the cost to the total actual cost. Also, determines whether the sucker customer would pay more or less with a ultimate plan.
    if(chosenDataPlan == "Sucker")
    {
      numSuckerCustomers += 1;
      totalActualCost += parseInt(billSuckerPlan(numofMB));

      if(parseInt(billSuckerPlan(numofMB)) > 49.99)
      {
        numCustomersUltimateBestFor++;
      }
    }
    newCell3.innerHTML = chosenDataPlan;
    
    //Outputs the basic plan cost given the number of MB.
    var newCell4 = newRow.insertCell();
    totalBasicCost += parseInt(billBasicPlan(numofMB));
    newCell4.innerHTML = "$" + billBasicPlan(numofMB);
    
    //Outputs the comprehensive plan cost given the number of MB.
    var newCell5 = newRow.insertCell();
    totalCompCost += parseInt(billComprehensivePlan(numofMB));
    newCell5.innerHTML = "$" + billComprehensivePlan(numofMB);
    
    //Outputs the sucker plan cost given the number of MB.
    var newCell6 = newRow.insertCell();
    totalSuckerCost += parseInt(billSuckerPlan(numofMB));
    newCell6.innerHTML = "$" + billSuckerPlan(numofMB);
    
    //Outputs the ultimate plan cost
    var newCell7 = newRow.insertCell();
    unlimitedPlanCost = 49.99;
    newCell7.innerHTML = "$" + unlimitedPlanCost;
  }
}
 
