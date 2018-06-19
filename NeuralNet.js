class NeuralNet{
  constructor(inputNodes, hiddenNodes, outputNodes, hiddenLayers){
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: hiddenNodes, inputShape: [inputNodes]}));
    for(let i = 1; i < hiddenLayers; i++){
       this.model.add(tf.layers.dense({units: hiddenNodes}));
    }
    this.model.add(tf.layers.dense({units: outputNodes}));
    this.hiddenLayers = hiddenLayers;
    this.model.compile();
  }

  predict(inputs){
    return this.model.predict(inputs);
  }

  duplicate(){
    let newModel = tf.sequential();
    for(let i = 0; i <= this.hiddenLayers; i++){
      newModel.add(this.model.getLayer(i));
    }
    return newModel;
  }

  mutate(){
    for(let i = 0; i < this.hiddenLayers; i++){

    }
  }

  dispose(){

  }

  merge(that){

  }
}
