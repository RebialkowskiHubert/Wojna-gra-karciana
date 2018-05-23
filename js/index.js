const karty = [
    '2k', '2ka', '2p', '2t', 
    '3k', '3ka', '3p', '3t',
    '4k', '4ka', '4p', '4t',
    '5k', '5ka', '5p', '5t',
    '6k', '6ka', '6p', '6t',
    '7k', '7ka', '7p', '7t',
    '8k', '8ka', '8p', '8t',
    '9k', '9ka', '9p', '9t',
    '10k', '10ka', '10p', '10t',
    '11k', '11ka', '11p', '11t',
    '12k', '12ka', '12p', '12t',
    '13k', '13ka', '13p', '13t',
    '14k', '14ka', '14p', '14t',
];

let aplikacja = new Vue({
    el: '#app',

    data:{
        status: 'Kliknij na kartę gracza, by położyć kartę',
        ruchy: 0,
        wszystkieKarty: [],
        komputerKarty: [],
        graczKarty: [],
        kartyWojny: [],
        komputerKarta: '',
        graczKarta: '',
        komputerKartaImg: 'img/tlo.png',
        graczKartaImg: 'img/tlo.png',
        wygrana: false
    },

    methods:{
        start(){
            this.uruchomiona = true;
            this.wszystkieKarty = this.tasuj(karty);
            this.rozdaj();
        },

        tasuj(tab) {
            let i, j;
            for(i = tab.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                [tab[i], tab[j]] = [tab[j], tab[i]];
            }
        
            return tab;
        },

        rozdaj() {
            let gracz = false, i;
            for(i = 0; i < this.wszystkieKarty.length; i++) {
                if(gracz === false) {
                    this.komputerKarty.push(this.wszystkieKarty.shift());
                    gracz = true;
                    continue;
                }
                else {
                    this.graczKarty.push(this.wszystkieKarty.shift());
                    gracz = false;
                }
            }
        },

        polozKarte() {
            if(this.wygrana)
                return;

            this.komputerKarta = this.komputerKarty.shift();
            this.graczKarta = this.graczKarty.shift();
            this.komputerKartaImg = 'img/' + this.komputerKarta + '.svg';
            this.graczKartaImg = 'img/' + this.graczKarta + '.svg';
            this.ruchy++;

            if(this.getWartoscKarty(this.komputerKarta) > this.getWartoscKarty(this.graczKarta)) {
                this.komputerKarty.push(this.graczKarta);
                this.komputerKarty.push(this.komputerKarta);

                if(this.kartyWojny.length !== 0) {
                    this.komputerKarty = this.komputerKarty.concat(this.kartyWojny);
                    this.kartyWojny = [];
                }

                this.status = "Komputer wygrał bitwę";
            }

            else if(this.getWartoscKarty(this.komputerKarta) < this.getWartoscKarty(this.graczKarta)) {
                this.graczKarty.push(this.komputerKarta);
                this.graczKarty.push(this.graczKarta);

                if(this.kartyWojny.length !== 0) {
                    this.graczKarty = this.graczKarty.concat(this.kartyWojny);
                    this.kartyWojny = [];
                }

                this.status = "Gracz wygrał bitwę";
            }

            else if(this.getWartoscKarty(this.komputerKarta) === this.getWartoscKarty(this.graczKarta)) {
                this.status = "Wojna";

                this.kartyWojny.push(this.komputerKarta);
                this.kartyWojny.push(this.graczKarta);
                this.kartyWojny.push(this.komputerKarty.shift());
                this.kartyWojny.push(this.graczKarty.shift());
                
                this.komputerKartaImg = 'img/tlo.png';
                this.graczKartaImg = 'img/tlo.png';
            }

            if(this.komputerKarty.length === 0) {
                this.status = "Wygrał gracz!!!";
                this.wygrana = true;
            }
            else if(this.graczKarty.length === 0) {
                this.status = "Wygrał komputer!!!";
                this.wygrana = true;
            }
        },

        getWartoscKarty(karta) {
            return parseInt(karta.match(/\d+/)[0]);
        }
    }
});

aplikacja.start();