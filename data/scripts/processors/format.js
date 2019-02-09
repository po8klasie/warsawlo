
module.exports = (data) => new Promise(resolve => resolve({
name: {
  full: data['Nazwa placówki'],
  short: data['Nazwa skrócona']
},
contact: {
  email: data['E-mail'],
  fax: data['Fax'],
  phone: data['Telefon'],
  website: data['WWW']
},
students: {
  type: data['Kategoria uczniów'] == 'Dorośli' ? 'adults' : 'youth',
  dominantDisability: data['Niepełnosprawność dominująca'] == '' ? null : data['Niepełnosprawność dominująca']
},
location: {
  street: data['Ulica'],
  houseNumber: data['Nr domu']
},
meta: {
  schoolType: data['Typ placówki'],
  public: data['Publiczność'] == 'publiczna' ? true : (data['Publiczność'] == 'niepubliczna o uprawnieniach szkoły publicznej' ? 'publicPrivileges' : false),
  leadingOrgan: {
      name: data['Organ prowadzący'],
      type: data['Typ organu prowadzącego']
  },
  parent: data['Podmiot nadrzędny'],
  capitalOwner: data['Własność podmiotu kapitału'],
  establishmentDate: data['Data założenia'],
  dependence: data['Rodzaj placówki'],
  regon: data['Regon']
  }
}))
