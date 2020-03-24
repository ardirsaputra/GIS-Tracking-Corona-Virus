var trackingMap = document.getElementById('trackingmap');
var heatMap = document.getElementById('heatmap');
var bnpbMap = document.getElementById('bnpbmap');

var buttonheatmap = document.getElementById('buttonheatmap');
var buttontrackingmap = document.getElementById('buttontrackingmap');
var buttonbnpb = document.getElementById('buttonbnpb');

var info = document.getElementById('info');

function switchMap(state) {
    if (state == 'track') {
        tracking.invalidateSize();
        trackingMap.style.display = "block";
        heatMap.style.display = "none";
        bnpbMap.style.display = "none";

        buttontrackingmap.classList.add('btn-primary');
        buttonheatmap.classList.remove('btn-primary'); // untuk menganti warna tombol
        buttonbnpb.classList.remove('btn-primary');
        tracking.invalidateSize();
    }
    if (state == 'heat') {
        heat.invalidateSize();
        trackingMap.style.display = "none";
        heatMap.style.display = "block";
        bnpbMap.style.display = "none";

        buttontrackingmap.classList.remove('btn-primary');
        buttonheatmap.classList.add('btn-primary'); // untuk menganti warna tombol
        buttonbnpb.classList.remove('btn-primary'); // untuk menganti warna tombol
        heat.invalidateSize();
    }
    if (state == 'bnpb') {
        bnpb.invalidateSize();
        trackingMap.style.display = "none";
        heatMap.style.display = "none";
        bnpbMap.style.display = "block";

        buttontrackingmap.classList.remove('btn-primary');
        buttonheatmap.classList.remove('btn-primary');
        buttonbnpb.classList.add('btn-primary'); // untuk menganti warna tombol
        bnpb.invalidateSize();
    }
}

trackingMap.style.display = "none";
heatMap.style.display = "none";
bnpbMap.style.display = "block";
buttonbnpb.classList.add('btn-primary');

var lokasi = {
    "nasional": {
        "y": "-0.5569651",
        "x": "115.7244012"
    },
    "lampung": {
        "y": "-4.8466317",
        "x": "105.2164522",
        "z": "8.2"
    }
};

var cfg = {
    "radius": 0.001,
    "maxOpacity": 0.8,
    "scaleRadius": true,
    "useLocalExtrema": false,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
};

var baseLayerTracking = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>' +
        ' data virus corona source from <a href="http://covid19.bnpb.go.id/">BNPB and Covid19.co.id</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA'
});

var baseLayerHeat = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>' +
        ' data virus corona source from <a href="http://covid19.bnpb.go.id/">BNPB and Covid19.co.id</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA'
});

var baseLayerBNPB = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>' +
        ' data virus corona source from <a href="http://covid19.bnpb.go.id/">BNPB and Covid19.co.id</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA'
});

var heatmapLayer = new HeatmapOverlay(cfg);
// don't forget to include leaflet-heatmap.js

var bnpb = new L.Map('bnpbmap', {
    fullscreenControl: true,
    center: new L.LatLng(lokasi.nasional.y, lokasi.nasional.x),
    zoom: 5,
    layers: [baseLayerBNPB]
});

var tracking = new L.Map('trackingmap', {
    fullscreenControl: true,
    center: new L.LatLng(lokasi.lampung.y, lokasi.lampung.x),
    zoom: lokasi.lampung.z,
    layers: [baseLayerTracking]
});

fetch('data/lampung_positif.json')
    .then(res => res.json())
    .then(data => {

        console.log(data);

        var testData = {
            max: 0,
            data: []
        };
        data.map(data => {
            var nama = data.nama;
            infoString +=
                '<div  class="m-2 row border-right border-top border-danger" onclick="findTrcking(' + data.id + ')"> ' +
                '<div class="d-flex justify-content-center col-12">' +
                '<div class="d-inline-block text-truncate text-blue" data-toggle="tooltip" data-placement="top" title="Klik Untuk Lihat">' +
                '<div class="row pl-1">' +
                '<table class="" style="width:190px" class="" >' +
                '<tr>' +
                '<td colspan="2" class="col-12"><small class=""> <strong class="d-inline-block text-truncate" style="max-width: 200px;"><a  style="max-width: 300px;" href="">' + data.nama + '</a></strong></small></td>' +
                '</tr>' +
                '<tr class="">' +
                '<td class="col-6"><small class="text-primary">Keadaan</small></td>' +
                '<td class="col-5"><small class="text-primary"><strong>' + data.keadaan + '</strong></small></td>' +
                '</tr>' +
                '<tr>' +
                '<td class="col-6"><small class="text-success">Umur</small></td>' +
                '<td class="col-5"><small class="text-success"><strong>' + data.umur + '</strong></small></td>' +
                '</tr>' +
                '<tr>' +
                '<td class="col-6"><small class="text-danger">Sumber</small></td>' +
                '<td class="col-5"><small class="text-danger"><strong class=""><a class="d-inline-block text-truncate" data-toggle="tooltip" data-placement="top" title="' + data.sumber + '" style="max-width: 150px;" href="' + data.sumber + '">' + data.sumber + '</a></strong></small></td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            data.geometry.map(data => {
                testData.data.push({ lat: parseFloat(data.y), lng: parseFloat(data.x), count: 1 });
                testData.max = testData.data.length;
            });
        });
        heatmapLayer.setData(testData);
        info.innerHTML = infoString;
    });

var canvas = document.getElementById('canvas');
var earlywidth = canvas.offsetWidth;

var heat = new L.Map('heatmap', {
    fullscreenControl: true,
    center: new L.LatLng(lokasi.lampung.y, lokasi.lampung.x),
    zoom: lokasi.lampung.z,
    layers: [baseLayerHeat, heatmapLayer]
});

var infoString = "";

function findTrcking(id) {
    switchMap("track");
    tracking.eachLayer(function(layer) {
        tracking.removeLayer(layer);
    });

    baseLayerTracking = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA', {
        minZoom: 0,
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>' +
            ' data virus corona source from <a href="http://covid19.bnpb.go.id/">BNPB and Covid19.co.id</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYXJkaXJhZ2lscyIsImEiOiJjazd4bDh0ZnIwZTNhM2txcGcwamNyaHloIn0.zEdjQeMEfSL4uvVSg3uEaA'
    });

    tracking.addLayer(baseLayerTracking);

    fetch('data/lampung_positif.json')
        .then(res => res.json())
        .then(data => {
            data.map(each => {
                if (data.id !== "undefined") {
                    if (each.id == id) {
                        var nama = data.nama;
                        var polylinePoints = Array();
                        if (each.geometry.length > 1) {
                            var lastgeometry = each.geometry[each.geometry.length - 1];
                            each.geometry.map(geometry => {
                                // console.log("data geometry : " + geometry.id);
                                // console.log("last geometry : " + lastgeometry.id);
                                if (geometry.id == lastgeometry.id) {
                                    L.marker([geometry.y, geometry.x], { icon: greenIcon, color: '#5fdba7' }).addTo(tracking).bindPopup(nama + " (" + geometry.tanggal + ")<br> Note :" + geometry.note);
                                } else {
                                    L.marker([geometry.y, geometry.x], { icon: yellowIcon, color: '#FFd300' }).addTo(tracking).bindPopup(nama + " (" + geometry.tanggal + ")<br> Note :" + geometry.note);
                                }
                                polylinePoints.push([geometry.y, geometry.x]);
                            });
                        } else {
                            var lastgeometry = each.geometry[0];
                            L.circleMarker([geometry.y, geometry.x], { icon: yellowIcon, color: '#5fdba7' }).addTo(tracking).bindPopup(nama + " (" + geometry.tanggal + ")<br> Note :" + geometry.note);
                            polylinePoints.push([lastgeometry.y, lastgeometry.x]);
                        }

                        var polyline = new L.Polyline(polylinePoints, {
                            color: 'red',
                            weight: 3,
                            opacity: 0.5,
                            smoothFactor: 1
                        }).arrowheads({ fill: false, yawn: 20, size: '20px' }).addTo(tracking);
                        return;
                    }
                } else {
                    alert('Data Tidak Ditemukan');
                }
            });
        });
}

var canvas = document.getElementById('canvas');
var earlywidth = canvas.offsetWidth;
setInterval(
    () => {
        if (document.body.offsetWidth >= 1370) {
            document.getElementById('tampilan').style.display = "none";
        } else {
            document.getElementById('tampilan').style.display = "block";
        }

        if (document.body.offsetWidth < 1188) {
            var size = info.offsetWidth + "px";
            document.getElementById('card-info').style.width = size;
            document.getElementById('card-daerah').style.width = size;
        } else {
            var size = info.offsetWidth + "px";
            document.getElementById('card-info').style.width = size;
            document.getElementById('card-daerah').style.width = size;
        }
        console.log(document.body.offsetWidth);
        if (document.body.offsetWidth != earlywidth) {
            var size = canvas.offsetWidth + "px";
            trackingMap.style.width = size;
            heatMap.style.width = size;
            bnpbMap.style.width = size;
            earlywidth = canvas.offsetWidth;

        }
    }, 250
);

fetch('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(res => res.json())
    .then(data => {
        var daerahText = "";
        if (data.features.length == "0") {
            daerahText = '<div class="p-4 ml-4 mr-4  d-flex align-items-center"><center class="m-2">Data Kosong <br><a href="https://experience.arcgis.com/experience/57237ebe9c5b4b1caa1b93e79c920338"> <i class="fas fa-search"></i>Cek Kebenaran</a><center><div>';
        }
        var sorter = data.features;
        sorter.sort((a, b) => {
            return a.attributes.Kasus_Posi - b.attributes.Kasus_Posi;
        });
        sorter.reverse();
        sorter.map((data) => {
            var attributes = data.attributes;
            var geometry = data.geometry;
            // if (attributes.Provinsi != "Indonesia") {
            if (attributes.Kasus_Meni != 0 || attributes.Kasus_Semb != 0 || attributes.Kasus_Posi != 0) {
                L.circleMarker([geometry.y, geometry.x], { color: '#DC143C' }).addTo(bnpb).bindPopup(
                    attributes.Provinsi + "</br>" +
                    attributes.Kasus_Posi + " Terinfeksi <br>" +
                    attributes.Kasus_Semb + " Sembuh <br>" +
                    attributes.Kasus_Meni + " Meninggal <br>"
                );
                daerahText += '<div  class="m-2 row border-right border-top border-danger"> ' +
                    '<div class="d-flex justify-content-center col-12">' +
                    '<div class="">' +
                    '<div class="row pl-1">' +
                    '<table class="" style="width:190px" class="">' +
                    '<tr>' +
                    '<td colspan="3" class="col-12"><small class=""> <strong class="d-inline-block text-truncate" style="max-width: 200px;">' + attributes.Provinsi + '</strong></small></td>' +
                    '</tr>' +
                    '<tr class="">' +
                    '<td class="col-6"><small class="text-primary">Terkonfirmasi</small></td>' +
                    '<td class="col-1"><small class="text-primary">:</small></td>' +
                    '<td class="col-5"><small class="text-primary"><strong>' + attributes.Kasus_Posi + '</strong></small></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="col-6"><small class="text-success">Sembuh</small></td>' +
                    '<td class="col-1"><small class="text-success">:</small></td>' +
                    '<td class="col-5"><small class="text-success"><strong>' + attributes.Kasus_Semb + '</strong></small></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="col-6"><small class="text-danger">Meninggal</small></td>' +
                    '<td class="col-1"><small class="text-danger">:</small></td>' +
                    '<td class="col-5"><small class="text-danger"> <strong>' + attributes.Kasus_Meni + '</strong></small></td>' +
                    '</tr>' +
                    '</table>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            // }
        });
        document.getElementById('daerah').innerHTML = daerahText;
    }).catch(err => {
        console.log(err);
    });


fetch('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(res => res.json())
    .then(data => {

        var Jumlah_Kasus_Baru_per_Hari = 0;
        var Jumlah_Kasus_Kumulatif = 0;
        var Jumlah_pasien_dalam_perawatan = 0;
        var Persentase_Pasien_dalam_Perawatan = 0;
        var Pesentase_Kasus_Baru_per_Hari = 0;
        var Jumlah_Pasien_Sembuh = 0;
        var Persentase_Pasien_Sembuh = 0
        var Jumlah_Pasien_Meninggal = 0;
        var Persentase_Pasien_Meninggal = 0;

        data.features.map((data) => {
            data = data.attributes;
            if (data.Jumlah_Kasus_Kumulatif != null) {
                Jumlah_Kasus_Baru_per_Hari = data.Jumlah_Kasus_Baru_per_Hari;
                Jumlah_Kasus_Kumulatif = data.Jumlah_Kasus_Kumulatif;
                Jumlah_pasien_dalam_perawatan = data.Jumlah_pasien_dalam_perawatan;
                Persentase_Pasien_dalam_Perawatan = data.Persentase_Pasien_dalam_Perawatan;
                Jumlah_Pasien_Sembuh = data.Jumlah_Pasien_Sembuh;
                Persentase_Pasien_Sembuh = data.Persentase_Pasien_Sembuh;
                Jumlah_Pasien_Meninggal = data.Jumlah_Pasien_Meninggal;
                Persentase_Pasien_Meninggal = data.Persentase_Pasien_Meninggal;
                Pesentase_Kasus_Baru_per_Hari = Jumlah_Kasus_Baru_per_Hari / Jumlah_Kasus_Kumulatif * 100;
                var Pesentase_Kasus_Baru_per_Hari_text = Pesentase_Kasus_Baru_per_Hari.toString();
                Pesentase_Kasus_Baru_per_Hari_text = Pesentase_Kasus_Baru_per_Hari_text.slice(0, 4);

                document.getElementById('Kasus_Terkonfirmasi_Akumulatif').innerHTML = Jumlah_Kasus_Kumulatif;
                document.getElementById('Kasus_Sembuh_Akumulatif').innerHTML = Jumlah_Pasien_Sembuh;
                document.getElementById('Kasus_Meninggal_Akumulatif').innerHTML = Jumlah_Pasien_Meninggal;

                document.getElementById('Pesentase_Kasus_Baru_per_Hari').innerHTML = "(" + Jumlah_Kasus_Baru_per_Hari + " ) " + Pesentase_Kasus_Baru_per_Hari_text + " %";
                Persentase_Pasien_dalam_Perawatan = Persentase_Pasien_dalam_Perawatan / 1000;
                var Persentase_Pasien_dalam_Perawatan_text = Persentase_Pasien_dalam_Perawatan.toString();
                Persentase_Pasien_dalam_Perawatan_text = Persentase_Pasien_dalam_Perawatan_text.slice(0, 4);
                document.getElementById('Jumlah_pasien_dalam_perawatan').innerHTML = Jumlah_pasien_dalam_perawatan ";

                // Tanggal pembahuruan
                var time = data.Tanggal;
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                var pembaruan = new Date(time).toLocaleDateString('id-ID', options);
                document.getElementById('date').innerHTML = pembaruan;

            }
        });
    }).catch(err => {
        console.log(err);
        alert("Connection Error");
    });