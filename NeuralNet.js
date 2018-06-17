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
      let randomInputIndex = Math.floor(Math.random()*this.inputNodes);
      let randomHiddenIndex = Math.floor(Math.random()*this.inputNodes);
      let newInputWeights = this.inputWeights.dataSync().splice(0, randomInputIndex).concat(that.inputWeights.dataSync().splice(randomInputIndex));
      let newOutputWeights = this.outputWeights.dataSync().splice(0, randomOutputIndex).concat(that.outputWeights.dataSync().splice(randomOutputIndex));
      merged.inputWeights = newInputWeights;
      merged.outputWeights = newOutputWeights;
    });
    return merged;
  }
}
