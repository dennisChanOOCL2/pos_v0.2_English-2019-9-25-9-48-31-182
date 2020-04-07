'use strict';


/*
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      unit: 'bottle',
      price: 3.00
    }

 */
function printReceipt(inputs) {
  let itemList = generateItemList(inputs);
  let receipt = generateReceipt(itemList);
  let formattedStr = receiptRepresentation(receipt);
  console.log(formattedStr);
  return formattedStr;
}

function generateItemList(inputs){
  let itemList = initItemWithIdAndCount(inputs);
  for(let index = 0; index < itemList.length; index++){
    let item = itemList[index];
    setDataForItem(item);
    calTotalPriceForItem(item);
  }
  return itemList;
}

function initItemWithIdAndCount(itemIdList){
  let resultItemList = [];
  for(let index = 0; index < itemIdList.length; index++){
    let item = {itemId : itemIdList[index], quantity : 1};
    let exist = resultItemList.filter(element => element.itemId === itemIdList[index]);
    if(exist.length === 0){
      resultItemList.push(item);
    } else{
      exist[0].quantity += 1;
    }
  }
  return resultItemList;
}

function setDataForItem(item){
  const itemInfoList = loadAllItems();
  let itemInfo = itemInfoList.filter(element => element.barcode === item.itemId);
  if(itemInfo.length != 0){
    item.name = itemInfo[0].name;
    item.unit = itemInfo[0].unit;
    item.price = itemInfo[0].price;
  }
  return item;
}

function calTotalPriceForItem(item){
  item.subTotalPrice = item.quantity * item.price;
  return item;
}

function generateReceipt(itemList){
  let receipt = {};
  receipt.itemList = itemList;
  receipt.totalPrice = calTotalPriceForReceipt(itemList);
  return receipt;
}

function calTotalPriceForReceipt(itemList){
  let totalPrice = 0;
  for(let index = 0; index < itemList.length; index++){
    totalPrice += itemList[index].subTotalPrice;
  }
  return totalPrice;
}

/***<store earning no money>Receipt ***
 Name: Coca-Cola, Quantity: 5 bottles, Unit price: 3.00 (yuan), Subtotal: 15.00 (yuan)
 Name: Sprite, Quantity: 2 bottles, Unit price: 3.00 (yuan), Subtotal: 6.00 (yuan)
 Name: Battery, Quantity: 1, Unit price: 2.00 (yuan), Subtotal: 2.00 (yuan)
 ----------------------
 总计: 23.00 (yuan)
 **********************/

function receiptRepresentation(receipt){
  var resultStr = '';
  resultStr += '***<store earning no money>Receipt ***';
  resultStr += '\n';
  let itemList = receipt.itemList;
  for(let index = 0; index < itemList.length; index++){
    resultStr+="Name：";
    resultStr+=itemList[index].name+"，";
    resultStr+="Quantity：";
    resultStr+=itemList[index].quantity+" ";
    if(itemList[index].quantity != 1){
      resultStr+=itemList[index].unit+"s，";
    }else{
      resultStr+=itemList[index].unit+"，";
    }
    resultStr+="Unit：";
    resultStr+=addZeroes(itemList[index].price)+" (yuan)，";
    resultStr+="Subtotal：";
    resultStr+=addZeroes(itemList[index].subTotalPrice)+" (yuan)";
    resultStr+='\n';
  }
  resultStr += '----------------------';
  resultStr += '\n';
  resultStr+="总计："+addZeroes(receipt.totalPrice)+" (yuan)";
  resultStr += '\n';
  resultStr += '**********************';
  return resultStr;
}

function addZeroes(num) {
  return num.toFixed(Math.max(((num+'').split(".")[1]||"").length, 2));
}