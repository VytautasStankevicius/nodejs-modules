module.exports = (template, product)=>{
    let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%VENDOR%}/g, product.from);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    return output;
} 