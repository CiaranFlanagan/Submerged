class Genetics {
  constructor() {
    //intialize the "key" properties of genetic algo
    this.population = [];
    this.populationTmp = [];
    this.populationSize = 6;
    this.populationFeaturesSize = 16;
    this.bestOfGeneration;
  }

  selectParent() {
    //select a parent from the temp population, using there fitness value
    let total = 0;
    for (let i = 0; i < this.populationTmp.length; i++) {
      total += this.populationTmp[i].fit;
    }
    let prob = Math.random() * total;
    for (let i = 0; i < this.populationTmp.length; i++) {
      if (prob < this.populationTmp[i].fit) {
        return this.populationTmp.splice(i, 1)[0];
      }
      prob -= this.populationTmp[i].fit;
    }
  }

  //initial population of random fishs
  createPopulation() {
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      let shape = [];
      for (let j = 0; j < this.populationFeaturesSize; j++) {
        shape.push(Math.random() < 0.5 ? 1 : 0);
      }
      this.population.push(new Fish(w / 4 / 2, Math.random() * -20, shape));
    }
  }

  //perform crossover between two parent fishs to create a child
  crossOver(_a, _b) {
    let a, b, x;
    if (Math.random() < 0.5) {
      a = _a;
      b = _b;
      x = w / 4 / 2;
    } else {
      a = _b;
      b = _a;
      x = a.x;
    }
    let child = new Fish(x, Math.random() * -20, a.shape.slice());
    let rand = Math.random();

    //mix shapes of the parrents
    if (rand < 0.33) {
      for (let i = 0; i < a.shape.length; i += 4) {
        child.shape[i] = b.shape[i];
        child.shape[i + 1] = b.shape[i + 1];
      }
    } else if (rand < 0.66) {
      for (let i = 0; i < a.shape.length / 2; i++) {
        child.shape[i] = b.shape[i];
      }
    } else {
      for (let i = 0; i < a.shape.length; i++) {
        let value = i % 2 ? a.shape[i] : b.shape[i];
        child.shape[i] = value;
      }
    }
    return child;
  }

  mutate(child) {
    //introduce a random mutation by flipping one feature in the child's shape
    let spot = Math.floor(Math.random() * child.shape.length);
    child.shape[spot] = child.shape[spot] ? 0 : 1; // Flip the value (1 -> 0 or 0 -> 1)
    return child;
  }

  evolve() {
    //create the next generation by performing selection, crossover, and mutation like in genetics
    let newPopulation = [];
    for (let x = 0; x < this.populationSize; x++) {
      this.populationTmp = this.population.slice();
      let a = this.selectParent();
      let b = this.selectParent();
      let child = this.crossOver(a, b);
      //initial 10 percent mutation rate
      if (Math.random() < 0.1) {
        child = this.mutate(child);
      }
      newPopulation.push(child); //
    }
    this.population = newPopulation; //replaces old population with the new one
  }

  elitism() {
    //the best individual from the current generation is carried forward
    this.createPopulation();
    let rand = Math.floor(Math.random() * this.population.length);
    //the best individual replaces a random individual in the new population
    let fish = new Fish(
      w / 4 / 2,
      Math.random() * -20,
      this.bestOfGeneration.shape.slice()
    );
    this.population[rand] = fish;
  }
}
