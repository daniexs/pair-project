function Icd(data) {
    if (data == "Flu Burung") {
        return "J032i6"
    } else if(data == "Hipertensi"){
        return "J328906"
    } else if(data == "Diabetes"){
        return "J032986"
    } else if(data == "Asma"){
        return "J238406"
    } else if(data == "Artritis"){
        return "J03246"
    } else if(data == "Migrain"){
        return "J09236"
    } else if(data == "Osteoporosis"){
        return "J02346"
    } else if(data == "Flu Biasa"){
        return "J0906"
    } else if(data == "GERD (Gastroesophageal Reflux Disease)"){
        return "J0436"
    } else if(data == "Bronkitis"){
        return "J4598"
    }else{
        return "Unkowns"
    }
}

module.exports = Icd




