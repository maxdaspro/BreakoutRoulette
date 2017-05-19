Math.deg2rad = function (d) {
    return d * Math.PI / 180;
};
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};
var Helper = {
        randomValue: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        randomBin: function () {
            return Math.round(Math.random());
        },
        randomValueIncl: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        pcProgress: function (progress, max) {
            return 1 - (progress / max);
        },
        twoColorsInterpolation: function (a, b, u) {
            return (1 - u) * a + u * b;
        },
        randomHexColor: function () {
            let hex = '0123456789ABCDEF';
            let colorHex = '#';

            for (let i = 0; i < 6; i++) {
                colorHex += hex[this.randomValueIncl(0, 15)];
            }

            return colorHex;
        },
        randomHexNumber: function () {
            return '0x' + Math.floor(Math.random() * 16777215).toString(16);
        },
        getEllipsePos: function (ra, rb, deg) {

            let x = ra * Math.cos(Math.deg2rad(deg));
            let y = rb * Math.sin(Math.deg2rad(deg));

            return {'x': x, 'y': y};
        },
        getDocumentWidth: function () {
            return window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth ||
                document.body.offsetWidth;
        },
        getDocumentHeight: function () {
            return window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight ||
                document.body.offsetHeight;
        },
        distanceBetween: function (p1, p2) {

            let x = p1.x - p2.x;
            let y = p1.y - p2.y;

            return Math.sqrt(y * y + x * x);
        },
        // degreeTwoPoints: function (p1, p2) {
        //
        //     let x = p1.x - p2.x;
        //     let y = p1.y - p2.y;
        //
        //     return Math.degrees(Math.atan2(y, x));
        // },
        degreeTwoPoints: function (p1, p2) {

            let x = p2.x - p1.x;
            let y = p2.y - p1.y;

            return Math.degrees(Math.atan2(y, x));
        },
        moveToStepDegree: function (element, step, angle) {

            let pos = Helper.getEllipsePos(step, step, angle);

            //Move element to degree
            element.x += pos.x;
            element.y += pos.y;
        },
        sleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        updateValue: function (element, value) {
            element.innerText = value;
        },
        ajax: function (url, success, fail, method = 'GET') {

            let xhr = new XMLHttpRequest();

            xhr.open(method, url, true);

            xhr.onload = () => {

                if (xhr.status === 200) {
                    success(xhr.response);
                } else {
                    //...
                }
            };
            xhr.send();
        },
        behindObject: function (obj1, obj2, obj3) {

            //Si distance obj3 > obj2
            let dist1_2 = this.distanceBetween(obj1, obj2);
            let dist1_3 = this.distanceBetween(obj1, obj3);
            if (dist1_3 < dist1_2) {
                return false;
            }

            let obj = {};
            obj.min = {};
            obj.max = {};

            //Angle de object obstructeur
            let Obj2Angle = this.degreeTwoPoints(
                {x: obj1.x, y: obj1.y},
                {x: obj2.x, y: obj2.y}
            );

            //Angle de object derrière
            let Obj3Angle = this.degreeTwoPoints(
                {x: obj1.x, y: obj1.y},
                {x: obj3.x, y: obj3.y}
            );

            //Positions de ses extrémités (radius)
            let posMin = this.getEllipsePos(obj2.radius, obj2.radius, Obj2Angle - 90)
            obj.min.x = obj2.x + posMin.x;
            obj.min.y = obj2.y + posMin.y;
            let angleMin = this.degreeTwoPoints(
                {x: obj1.x, y: obj1.y},
                {x: obj.min.x, y: obj.min.y}
            );

            let posMax = this.getEllipsePos(obj2.radius, obj2.radius, Obj2Angle + 90)
            obj.max.x = obj2.x + posMax.x;
            obj.max.y = obj2.y + posMax.y;
            let angleMax = this.degreeTwoPoints(
                {x: obj1.x, y: obj1.y},
                {x: obj.max.x, y: obj.max.y}
            );

            // console.log('Min : ' + (Math.round(angleMin)) + '° Max : ' + (Math.round(angleMax)) + '°');
            // console.log(Math.round(Obj3Angle) + '°');

            return Obj3Angle > angleMin && Obj3Angle < angleMax;
        },
        Phaser: {
            drawObjectInGroup(type, map, layer, group){
                let result = Helper.Phaser.findObjectsByType(type, map, layer);
                result.forEach(function (element) {
                    Helper.Phaser.createFromTiledObject(element, group);
                }, this);
            },
            findObjectsByType: function (type, map, layer) {

                var result = new Array();
                map.objects[layer].forEach(function (element) {

                    // if (element.type === type || element.name === type) {
                    if (element.name === type) {
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
            },
            addGroups: function (names = [], layer, map) {

                let groups = {};
                names.forEach(name => {
                    let group = game.add.group();
                    group.enableBody = true;
                    group.alpha = 1;
                    Helper.Phaser.drawObjectInGroup(name, map, layer, group);
                    groups[name] = group;
                })
                return groups;
            },
            drawPoint: function (position, color = 0xFFDD00) {
                let graphics = game.add.graphics(position.x, position.y);
                graphics.beginFill(color);
                graphics.drawCircle(0, 0, 4);
            }
        }
    }
;
