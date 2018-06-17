class NeuralNet{
  constructor(inputNodes, hiddenNodes, outputNodes){
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.inputWeights = tf.randomNormal([inputNodes, hiddenNodes]);
    this.hiddenWeights = tf.randomNormal([hiddenNodes, outputNodes]);
  }

  predict(inputs){
    let output;
    tf.tidy(() => {
      let inputLayer = tf.tensor(inputs, [1, this.inputNodes]);
      let hiddenLayer = inputLayer.matMul(this.inputWeights).sigmoid();
      let outputLayer = hiddenLayer.matMul(this.hiddenWeights).sigmoid();
      output = outputLayer.dataSync();
    });
    return output;
  }

  duplicate(){
    let clone = new NeuralNet(this.inputNodes, this.hiddenNodes, this.outputNodes);
    clone.inputWeights = this.inputWeights;
    clone.hiddenWeights = this.hiddenWeights;
    return clone;
  }

  mutate(){
    tf.tidy(() => {
      let temp = this.inputWeights.dataSync();
      let randomIndex = Math.floor(Math.random()*temp.length);
      temp[randomIndex] = temp[randomIndex]*(Math.random()*0.5+0.75);
      this.inputWeights = tf.tensor1d(temp);
      temp = this.hiddenWeights.dataSync();
      randomIndex = Math.floor(Math.random()*temp.length);
      temp[randomIndex] = temp[randomIndex]*(Math.random()*0.5+0.75);
      this.outputWeights = tf.tensor1d(temp);
    });
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
      merged.inputWeights = newInputWeights;
      merged.hiddenWeights = newHiddenWeights;
    });
    return merged;
  }
}