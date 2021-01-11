class PointsCalculator {
  constructor(data) {
    this.data = data;
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
      return this.data.find(entry => entry.name == 'exercise')
  }
  get afterEight() {
      return this.data.find(entry => entry.name == 'afterEight')
  }
  get week() {
      return this.data.find(entry => entry.name == 'weekOfPeriod')
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

  get exerciseAwardPoints() {
    const rule = this.exercise.rules.find(rule => rule.name === 'exerciseOnRestDay')
    return rule.points
  }

  get exercisedAtLeast30Min() {
      const rule = this.exercise.rules.find(rule => rule.name === 'exerciseOnRestDay')

      const selectedOption = this.exercise.options.find(option => option.id === this.exercise.selectedId)
      return selectedOption.name === rule.requiredOption
  }

  get exercisePts() {
      const selectedOption = this.exercise.options.find(option => option.id === this.exercise.selectedId)
      return (selectedOption && selectedOption.points) || 0
  }

  get scriptureStudyPts() {
      const scriptureStudy = this.scriptureStudy.options.find(option => option.name === 'scriptureStudy')
      return (scriptureStudy.performed) ? this.scriptureStudy.points : 0
  }

  get personalPrayerPts() {
      const personalPrayer = this.personalPrayer.options.find(option => option.name === 'personalPrayer')
      return (personalPrayer.performed) ? this.personalPrayer.points : 0
  }

  get dailyGreatnessPts() {
      const dailyGreatness = this.dailyGreatness.options.find(option => option.name === 'dailyGreatness')
      return (dailyGreatness.performed) ? this.dailyGreatness.points : 0
  }

  get afterEightPts() {
      const nothingEaten = this.afterEight.options.find(option => option.name === 'nothingEaten')
      return (nothingEaten.value) ? this.afterEight.points : 0
  }

  get waterPts() {
      let fnd = false
      const rule = this.water.rules.find(rule => rule.week === this.week.value)

      const cupsOfWaterConsumed = this.water.options.reduce((cnt, option) => {
        if (!fnd) {
          fnd = (option.id === this.water.selectedId)
          return cnt + option.cups
        } else return cnt
      }, 0)

      return (cupsOfWaterConsumed >= rule.cups) ? this.water.points : 0
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

  calculate() {
    let positiveFoodsPts = this.positiveFoodsPts + this.fruitsVegetablesPts.pts
    if (positiveFoodsPts > 10) positiveFoodsPts = 10
    positiveFoodsPts = positiveFoodsPts + this.fruitsVegetablesPts.bonus

    return [
      positiveFoodsPts, this.negativeFoodsPts,
      this.waterPts, this.exercisePts,
      this.afterEightPts, this.dailyGreatnessPts, this.personalPrayerPts, this.scriptureStudyPts
    ].reduce((totalPnts, pnts) => totalPnts + pnts, 0)
  }
}

exports.calculatePoints = (data) => {
  return (new PointsCalculator(data)).calculate()
}

exports.calculateWeeklyPoints = (data=[]) => {
  const extraData = {
    exercisedAllDays: false, 
    exercised30MinOneDay: false, 
    exercisePoints: [],
    exerciseAwardPoints: 0,
  }

  let totalPoints = data.reduce((totalPoints, day) => {
    if (day.data) {
      const pointsCalculator = new PointsCalculator(day.data)
      if (pointsCalculator.exercisedAtLeast30Min) extraData.exercised30MinOneDay = true
      extraData.exercisePoints.push(pointsCalculator.exercisePts)
      if (!extraData.exerciseAwardPoints) extraData.exerciseAwardPoints = pointsCalculator.exerciseAwardPoints

      return totalPoints + pointsCalculator.calculate()
    }

    return totalPoints
  }, 0)

  extraData.exercisedAllDays = extraData.exercisePoints.every(entry => entry > 0) 

  if (extraData.exercisedAllDays && extraData.exercised30MinOneDay)
    totalPoints += extraData.exerciseAwardPoints

  return totalPoints
}
