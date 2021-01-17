class UserTemplate {
  constructor(data) {
    this.data = data
  }

  generateOptionsFromRange (range) {
    let { min, max, pointValue, pointsLabel = 'points' } = range
    min = parseInt(min) || 0
    max = parseInt(max) || 10
    pointValue = parseInt(pointValue) || 1

    const options = []
    for (let i=min; i<=max; i++) {
      const points = (i === 0) ? 0 : pointValue
      options.push({id: i.toString(), [pointsLabel]: points})
    }

    return options
  }

  getDefaultDataFor (entryName) {
    const entry = this.data.find(entry => entry.name === entryName)
    delete entry.rules
    return entry
  }

  get positiveFoods() {
    const positiveFoods = this.getDefaultDataFor('positiveFoods')
    positiveFoods.options = this.generateOptionsFromRange(positiveFoods.options.range)

    delete positiveFoods.fruitsAndVegetables.rules
    positiveFoods.fruitsAndVegetables.options = this.generateOptionsFromRange(positiveFoods.fruitsAndVegetables.options.range)
    return positiveFoods
  }

  get negativeFoods() {
    const negativeFoods = this.getDefaultDataFor('negativeFoods')
    negativeFoods.options = this.generateOptionsFromRange(negativeFoods.options.range)
    return negativeFoods
  }
  
  get water() {
    const water = this.getDefaultDataFor('water')
    water.options = this.generateOptionsFromRange(water.options.range)
    return water
  }

  get afterEight() {
    return this.getDefaultDataFor('afterEight')
  }
  
  get exercise() {
    return this.getDefaultDataFor('exercise')
  }
  
  get dailyGreatness() {
    return this.getDefaultDataFor('dailyGreatness')
  }
  
  get personalPrayer() {
    return this.getDefaultDataFor('personalPrayer')
  }
  
  get scriptureStudy() {
    return this.getDefaultDataFor('scriptureStudy')
  }
  
  get weekOfPeriod () {
    const entry = this.data.find(entry => entry.name === 'weekOfPeriod')
    if (entry.rules) delete entry.rules
    const { type, name, value } = entry
    return { type, name, value }
  }
  
  get dayOfWeek () {
    const entry = this.data.find(entry => entry.name === 'dayOfWeek')
    if (entry.rules) delete entry.rules
    const { type, name, value } = entry
    return { type, name, value }
  }
  
  get transform() {
    return [
      this.weekOfPeriod, 
      this.dayOfWeek, 
      this.positiveFoods, 
      this.negativeFoods, 
      this.water, 
      this.afterEight, 

      this.exercise, 

      this.dailyGreatness, 
      this.personalPrayer, 
      this.scriptureStudy, 
    ]
  }
}

class UserWeekData {
  constructor(userData, templateData) {
    this.days = userData
    this.template = templateData
  }

  applyDay(day) {
    console.log(">>>day", day)
    const data = day.data.map(component => {
      let tComponent = component

      if (!['afterEight', 'dailyGreatness', 'personalPrayer', 'scriptureStudy'].includes(component.name)) {
        tComponent = this.template.find(tComp => tComp.name === component.name)
      }
      return {...component, options: tComponent.options}
    })

    return {...day, data}
  }

  get transform() {
    return this.days.map(day => this.applyDay(day))
  }
}

exports.getUserTemplate = (data) => (new UserTemplate(data)).transform

exports.applyUserTemplate = (templateData, userData) => {
  const userTemplate = (new UserTemplate(templateData)).transform
  // console.log(">>>userData", userData)
  return (new UserWeekData(userData, templateData)).transform
}
