class PointsCalculator {
  constructor(data={}) {
    const {day, rules} = data
    this.data = day;
    this.rules = rules;
  }

  get weekOfPeriod() {
      return this.data.find(entry => entry.name == 'weekOfPeriod')
  }
  get week() {
      return parseInt(this.weekOfPeriod.value)
  }
  get scriptureStudy() {
      return this.data.find(entry => entry.name == 'scriptureStudy')
  }
  get personalPrayer() {
      return this.data.find(entry => entry.name == 'personalPrayer')
  }
  get dailyGreatness() {
      return this.data.find(entry => entry.name == 'dailyGreatness')
  }
  get exercise() {
      // console.log(">>>this.data", this.data)
      return this.data.find(entry => entry.name == 'exercise')
  }
  get afterEight() {
      return this.data.find(entry => entry.name == 'afterEight')
  }
  get water() {
      return this.data.find(entry => entry.name == 'water')
  }
  get negativeFoods() {
      return this.data.find(entry => entry.name == 'negativeFoods')
  }
  get positiveFoods() {
      return this.data.find(entry => entry.name == 'positiveFoods')
  }
  get fruitsVegetables() {
      return this.data.find(entry => entry.name == 'positiveFoods').fruitsAndVegetables
  }

  // get exerciseAwardPoints() {
  //   const rule = this.exercise.rules.find(rule => rule.name === 'exerciseOnRestDay')
  //   return rule.points
  // }

  get exercisedAtLeast30Min() {
      // const rule = this.exercise.rules.find(rule => rule.name === 'exerciseOnRestDay')
      // const rule = {requiredOption: '31_plus'}
      const rule = this.rules.exerciseOnRestDay

      const selectedOption = this.exercise.options.find(option => option.id === this.exercise.selectedId)
      return selectedOption.name === rule.requiredOption
  }

  get exercisePts() {
      const selectedOption = this.exercise.options.find(option => option.id === this.exercise.selectedId)
      return (selectedOption && selectedOption.points) || 0
  }

  get scriptureStudyPts() {
      const scriptureStudy = this.scriptureStudy.options.find(option => option.name === 'scriptureStudy')
      return (scriptureStudy.performed) ? this.rules.scriptureStudyDaily.points : 0
  }

  get personalPrayerPts() {
      const personalPrayer = this.personalPrayer.options.find(option => option.name === 'personalPrayer')
      return (personalPrayer.performed) ? this.rules.personalPrayerDaily.points : 0
  }

  get dailyGreatnessPts() {
      const dailyGreatness = this.dailyGreatness.options.find(option => option.name === 'dailyGreatness')
      return (dailyGreatness.performed) ? this.rules.dailyGreatnessDaily.points : 0
  }

  get afterEightPts() {
      const nothingEaten = this.afterEight.options.find(option => option.name === 'nothingEaten')
      return (nothingEaten.value) ? this.rules.afterEightDaily.points : 0
  }

  get waterPts() {
      let fnd = false
      const requirementRule = this.rules.currentWaterRequirement(this.week)

      const cupsOfWaterConsumed = this.water.options.reduce((cnt, option) => {
        if (!fnd) {
          fnd = (option.id === this.water.selectedId)
          return cnt + option.cups
        } else return cnt
      }, 0)

      return (cupsOfWaterConsumed >= requirementRule.cups) ? this.rules.waterDaily.points : 0
  }

  get negativeFoodsPts() {
      let fnd = false
      return this.negativeFoods.options.reduce((total, option) => {
        if (!fnd) {
          fnd = (option.id === this.negativeFoods.selectedId)
          return total + option.points
        } else return total
      }, 0)
  }

  get positiveFoodsPts() {
      let fnd = false
      return this.positiveFoods.options.reduce((total, option) => {
        if (!fnd) {
          fnd = (option.id === this.positiveFoods.selectedId)
          return total + option.points
        } else return total
      }, 0)
  }

  get fruitsVegetablesPts() {
      let fnd = false
      const pts = this.fruitsVegetables.options.reduce((total, option) => {
        if (!fnd) {
          fnd = (option.id === this.fruitsVegetables.selectedId)
          return total + option.points
        } else return total
      }, 0)

      const bonus = (pts >= this.fruitsVegetables.positiveFoodsPointsRequirement) ? this.fruitsVegetables.points : 0

      return { pts, bonus }
  }

  calculate(options={}) {
    const exclude = options.exclude || []

    let positiveFoodsPts = this.positiveFoodsPts + this.fruitsVegetablesPts.pts
    if (positiveFoodsPts > 10) positiveFoodsPts = 10
    positiveFoodsPts = positiveFoodsPts + this.fruitsVegetablesPts.bonus

    const calculationInput = [
      positiveFoodsPts, this.negativeFoodsPts,
      this.waterPts, 
      this.afterEightPts, this.dailyGreatnessPts, this.personalPrayerPts, this.scriptureStudyPts
    ]

    if (!exclude.includes('exercise')) calculationInput.push( this.exercisePts )

    return calculationInput.reduce((totalPnts, pnts) => totalPnts + pnts, 0)
  }
}

class Rules {
  constructor(rules) {
    this.rules = rules
  }

  get exercise() {
    return this.rules.find(entry => entry.name === 'exercise')
  }

  get exerciseOnRestDay() {
    return this.exercise.rules.find(entry => entry.name === 'exerciseOnRestDay')
  }

  get exerciseRestDay() {
    return this.exercise.rules.find(entry => entry.name === 'restDay')
  }

  get exerciseMaxWeeklyPoints() {
    return this.exercise.rules.find(entry => entry.name === 'maxWeeklyPoints')
  }

  get water() {
    return this.rules.find(entry => entry.name === 'water')
  }

  get waterDaily() {
    return this.water.rules.find(entry => entry.name === 'dailyPoints')
  }

  currentWaterRequirement(week) {
    let rule = this.water.rules.find(entry => entry.week === week)
    if (!rule) rule = this.water.rules.find(entry => entry.isDefault)
    return rule
  }

  get afterEight() {
    return this.rules.find(entry => entry.name === 'afterEight')
  }

  get afterEightDaily() {
    return this.afterEight.rules.find(entry => entry.name === 'dailyPoints')
  }

  get dailyGreatness() {
    return this.rules.find(entry => entry.name === 'dailyGreatness')
  }

  get dailyGreatnessDaily() {
    return this.dailyGreatness.rules.find(entry => entry.name === 'dailyPoints')
  }

  get personalPrayer() {
    return this.rules.find(entry => entry.name === 'personalPrayer')
  }

  get personalPrayerDaily() {
    return this.personalPrayer.rules.find(entry => entry.name === 'dailyPoints')
  }

  get scriptureStudy() {
    return this.rules.find(entry => entry.name === 'scriptureStudy')
  }

  get scriptureStudyDaily() {
    return this.scriptureStudy.rules.find(entry => entry.name === 'dailyPoints')
  }

}

exports.calculatePoints = (data) => {
  let {day, rules: _rules} = data
  const rules = new Rules(_rules)

  // console.log(">>>calculatePoints, keys", Object.keys(data))
  return (new PointsCalculator({day, rules})).calculate()
}

exports.calculateWeeklyPoints = (_data={}) => {
  // console.log(">>>calculateWeeklyPoints, keys", Object.keys(_data))
  let {week: data, rules: _rules} = _data
  if (!data) data = []

  // console.log(">>>calculateWeeklyPoints, _rules", _rules)
  const rules = new Rules(_rules)
  
  const extraData = {
    exercisedExtraDays: false, 
    exercised30MinOneDay: false, 
    exercisePoints: [],
    exerciseRequiredDays: 5,
    exerciseAwardPoints: rules.exerciseOnRestDay.points,
    exerciseRestRule: rules.exerciseRestDay,
    maxWeeklyPointsRule: rules.exerciseMaxWeeklyPoints,
  }

  let totalPoints = data.reduce((totalPoints, day) => {
    // console.log(">>>calculateWeeklyPoints, totalPoints [1]", totalPoints)
    if (day.data) {
      const pointsCalculator = new PointsCalculator({day: day.data, rules})
      if (pointsCalculator.exercisedAtLeast30Min) extraData.exercised30MinOneDay = true
      extraData.exercisePoints.push(pointsCalculator.exercisePts)

      return totalPoints + pointsCalculator.calculate({exclude: ['exercise']})
    }

    return totalPoints
  }, 0)
  // console.log(">>>calculateWeeklyPoints, totalPoints [2]", totalPoints)

  // if user exercises 6 days, one of those days would be a typical rest day 
  // user should get extra points for exercising on one of their rest days
  // all users get 2 penalty free rest days
  const numberOfDaysExercised = (extraData.exercisePoints || []).filter(entry => entry > 0).length
  extraData.exercisedExtraDays = numberOfDaysExercised > extraData.exerciseRequiredDays
  let bonusExercisePoints = 0

  // exercise points
  let exercisePoints = extraData.exercisePoints.reduce((sum, points) => sum += points)
  
  // add rest points to exercise points
  const restDayPoints = extraData.exerciseRestRule.points * extraData.exerciseRestRule.maxCount
  exercisePoints +=  restDayPoints
  
  // add exercise bonus points
  if (extraData.exercisedExtraDays && extraData.exercised30MinOneDay)
    exercisePoints += extraData.exerciseAwardPoints

  // cap off exercise points
  if (exercisePoints > extraData.maxWeeklyPointsRule.points) exercisePoints = extraData.maxWeeklyPointsRule.points

  return totalPoints + exercisePoints
}
