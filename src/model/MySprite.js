import * as THREE from 'three'
// 创建精灵类

export class MySprite {
  constructor({ name, url, position, scale }) {
    const map = new THREE.TextureLoader().load(url);//纹理
    const material = new THREE.SpriteMaterial({ map: map });//精灵材质

    const sprite = new THREE.Sprite(material);//创建精灵物体
    sprite.scale.set(...scale)//缩放
    sprite.position.set(...position) //位置
    sprite.name = name//设置name方便后续使用
    // 把创建的精灵模型return出去  可以添加到其他模型上
    return sprite
    // scene.add(sprite);
  }

}
