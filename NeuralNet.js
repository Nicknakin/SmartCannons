class NeuralNet{
  constructor(inputNodes, hiddenNodes, outputNodes, hiddenLayers){
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: hiddenNodes, inputShape: [inputNodes]}));
    for(let i = 1; i < hiddenLayers; i++){
       this.mode.add(tf.layers.dense({units: hiddenNodes}));
    }
    this.model.add(tf.layers.dense({units: outputNodes}));
  }

  predict(inputs){

  }

  duplicate(){

  }

  mutate(){

  }

  dispose(){

  }

  merge(that){

  }
}
