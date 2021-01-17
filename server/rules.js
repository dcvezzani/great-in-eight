class Rules {
  constructor(data) {
    this.data = data
  }

  getDefaultDataFor (entryName) {
    const entry = this.data.find(entry => entry.name === entryName)
    const { type, name, title, rules } = entry
    return { type, name, title, rules }
  }

  get positiveFoods() {
    return this.getDefaultDataFor('positiveFoods')
  }

  get fruitsAndVegetables() {
    const positiveFoods = this.data.find(entry => entry.name === 'positiveFoods')
    const { fruitsAndVegetables } = positiveFoods

    return { 
      type: "fruitsAndVegetables", 
      name: "fruitsAndVegetables", 
      title: "Fruits & Vegetables",
      rules: fruitsAndVegetables.rules,
    }
  }

  get negativeFoods() {
    return this.getDefaultDataFor('negativeFoods')
  }
  
  get water() {
    return this.getDefaultDataFor('water')
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
  
  get transform() {
    return {rules: [
      this.positiveFoods, 
      this.fruitsAndVegetables, 
      this.negativeFoods, 
      this.water, 
      this.afterEight, 

      this.exercise, 

      this.dailyGreatness, 
      this.personalPrayer, 
      this.scriptureStudy, 
    ]}
  }
}

exports.parseRules = (data) => (new Rules(data)).transform
