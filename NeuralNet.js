class NeuralNet{
  constructor(inputNodes, hiddenNodes, outputNodes){
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.inputWeights = tf.randomNormal([inputNodes, hiddenNodes]);
    this.hiddenWeights = tf.randomNormal([hiddenNodes, outputNodes]);
  }

  predict(inputs){
    return tf.tidy(() => {
      let inputLayer = tf.tensor(inputs, [1, this.inputNodes]);
      let hiddenLayer = inputLayer.matMul(this.inputWeights).sigmoid();
      let outputLayer = hiddenLayer.matMul(this.hiddenWeights).sigmoid();
      return outputLayer.dataSync();
    });
  }

  duplicate(){1
    let clone = new NeuralNet(this.inputNodes, this.hiddenNodes, this.outputNodes);
    clone.inputWeights = this.inputWeights;
    clone.hiddenWeights = this.hiddenWeights;
    return clone;
  }

  mutate(){
    let newWeights = tf.tidy(() => {
      let temp = this.inputWeights.dataSync();
      let randomIndex = Math.floor(Math.random()*temp.length);
      temp[randomIndex] *= (Math.random()+.5)/2;
      let newInputWeights = tf.tensor(temp,[this.inputNodes, this.hiddenNodes]);
      temp = this.hiddenWeights.dataSync();
      randomIndex = Math.floor(Math.random()*temp.length);
      temp[randomIndex] *= (Math.random()+.5)/2;
      let newHiddenWeights = tf.tensor(temp,[this.hiddenNodes, this.outputNodes]);
      return [newInputWeights, newHiddenWeights];
    });
    this.inputWeights = newWeights[0];
    this.hiddenWeights = newWeights[1];
  }

  dispose(){

    tf.dispose(this.inputWeights);
    tf.dispose(this.hiddenWeights);
  }

  merge(that){
    let merged = new NeuralNet(this.inputNodes, this.hiddenNodes, this.outputNodes);
    tf.tidy(() => {
      let thisCurrentInputWeights = Array.from(this.inputWeights.dataSync());
      let thisCurrentHiddenWeights = Array.from(this.hiddenWeights.dataSync());
      let thatCurrentInputWeights = Array.from(that.inputWeights.dataSync());
      let thatCurrentHiddenWeights = Array.from(that.hiddenWeights.dataSync());
      let randomInputIndex = Math.floor(Math.random()*this.inputNodes);
      let randomHiddenIndex = Math.floor(Math.random()*this.hiddenNodes);
      let newInputWeights = thisCurrentInputWeights.splice(0, randomInputIndex).concat(thatCurrentInputWeights.splice(randomInputIndex));
      let newHiddenWeights = thisCurrentHiddenWeights.splice(0, randomHiddenIndex).concat(thatCurrentHiddenWeights.splice(randomHiddenIndex));
      merged.inputWeights = tf.tensor(newInputWeights, [this.inputNodes, this.hiddenNodes]);
      merged.hiddenWeights = tf.tensor(newHiddenWeights, [this.hiddenNodes, this.outputNodes]);
      tf.keep(merged.inputWeights);
      tf.keep(merged.hiddenWeights);
    });
    return merged;
  }
}
