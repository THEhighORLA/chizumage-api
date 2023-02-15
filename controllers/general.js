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


exports.statusSender = (statusCode)=>{
    const onlyZeros =  /^0*$/;
    let status = {
        statusCode,
        message:''
    };
    if(onlyZeros.test(statusCode)){
        status.statusCode = 0;
        status.message = "Operacion Exitosa";
    }else{
        status.message = getCodeError(status.statusCode);
    }

    return status;
}


const getCodeError = (statusCode) => {
    let message = 'NOT_MESSAGE_FOUND';

    switch(statusCode){
        case '100100':
            message = 'Error en la operacion - Monto Insuficiente';
    }
    return message;
}
