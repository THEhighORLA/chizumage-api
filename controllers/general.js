exports.usDateToLatin = (usDate) =>{
    let aux = usDate.split('-');
    let month = aux[0];
    let day = aux[1];
    let year = aux[2];
    
    return `${day}-${month}-${year}`;
}

exports.latinDateToUs = (latinDate) =>{
    let aux = latinDate.split('-');
    let month = aux[1];
    let day = aux[0];
    let year = aux[2];
    console.log('latinChange:')
    return `${month}-${day}-${year}`;
}

exports.formatBdDate = (date, format) => {
    let aux = date.split('-');
    let day,month,year = null;

    if(format == 'usa'){
        month = aux[0];
        day = aux[1];
        year = aux[2];
    }else{
        month = aux[1];
        day = aux[0];
        year = aux[2];
    }
    return  `${year}-${month}-${day}`;
}

exports.getExpirationPasswordDate = (date) => {
    console.log('Hola senor')
    let fDate = new Date(latinDateToUs(date));
    console.log('fDate->'+fDate)
    let expiredDate =  new Date(fDate.setMonth(fDate.getMonth()+3)).toLocaleDateString().replaceAll('/','-');
    return usDateToLatin(expiredDate);
}   
