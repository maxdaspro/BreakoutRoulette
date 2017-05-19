var PhaserHelper = {
    drawObjectInGroup(type, map, layer, group){
        let result = Helper.Phaser.findObjectsByType(type, map, layer);
        result.forEach(function (element) {
            Helper.Phaser.createFromTiledObject(element, group);
        }, this);
    },
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.type === type) {
                result.push(element);
            }
        });
        return result;
    },
    createFromTiledObject: function (element, group) {

        if (element.polygon || element.polyline) {

            let type = element.polygon ? 'polygon' : 'polyline';

            let offsetX = 0;
            let offsetY = 0;
            var pointsArray = element[type].map(item => {
                let x = item[0];
                let y = item[1];

                if (x < offsetX) offsetX = x;
                if (y < offsetY) offsetY = y;

                return {x: item[0], y: item[1]};
            });
            var polygon = new Phaser.Polygon(pointsArray);

            var graphics = new Phaser.Graphics();
            graphics.beginFill(0xFF33ff);
            graphics.drawPolygon(polygon);
            graphics.endFill();
            var texture = graphics.generateTexture();
            var sprite = group.create(element.x + offsetX, element.y + offsetY, texture);
            sprite.body.immovable = true;

        } else if (element.rectangle) {

            var graphics = new Phaser.Graphics();
            graphics.beginFill(0xFF33ff);
            graphics.drawRect(element.x, element.y, element.width, element.height);
            graphics.endFill();
            var texture = graphics.generateTexture();
            var sprite = group.create(element.x, element.y, texture);
            sprite.body.immovable = true;

        } else if (element.ellipse) {

            var graphics = new Phaser.Graphics();
            graphics.beginFill(0xFF33ff);
            graphics.drawEllipse(element.x, element.y, element.width / 2, element.height / 2);
            graphics.endFill();
            var texture = graphics.generateTexture();
            var sprite = group.create(element.x, element.y, texture);
            sprite.body.immovable = true;

        }
    }
};
