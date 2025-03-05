# Tesztjegyzőkönyv-Játékok megjelenítése a könyvtárban

Az alábbi tesztdokumentum a GŐZ projekthez tartozó 8.3.20. Játékok megjelenítése a könyvtárban funkcióihoz készült. Felelőse: Zoltai Zétény Csongor

## 1. Teszteljárások (TP)

### 1.1. Játékok megjelenítése a könyvtárban tesztelése
- Azonosító: TP-01
- Tesztesetek: TC-01, TC-02, TC-03
- Leírás: Játékok megjelenítése a könyvtárban funkció tesztelése
    0. lépés: Jelentkezzünk be és lépjünk a könyvtár oldalra
    1. lépés: Ellenőrizzük, hogy a rendszer minden játékot helyesen listáz a felhasználó könyvtárából
    2. lépés: Kattintsunk rá egy tetszőleges játékra
    2. lépés: Ellenőrizzük, hogy a navigáció jól működik
    3. lépés: Ellenőrizzük, hogy a játékok neve, valamint egyéb információk (pl. leírás, gombok) megjelennek 
    4. lépés: Elvárt kimenet: Minden ellenőrzés sikeres volt

## 2. Teszesetek (TC)

### 2.1. Játékok megjelenítése a könyvtárban tesztesetei

#### 2.1.1. TC-01
- TP: TP-01
- Leírás: Játékok megfelelő megjelenítése a könyvtárban
- Bemenet: Bejelentkezett felhasználó, egy játék a könyvtárban
- Művelet: Navigáljunk a könyvtár oldalra
- A könyvtárban szereplő játék helyesen jelenik meg

#### 2.1.2. TC-02
- TP: TP-01
- Leírás: A játékok megfelelő megjelenítése, ha a felhasználónak több játéka van
- Bemenet: Bejelentkezett felhasználó, több játék a könyvtárban
- Művelet: Navigáljunk a könyvtár oldalra
- Minden játék megjelenik

#### 2.1.3. TC-03
- TP: TP-01
- Leírás: Ha nincsen a könyvtárban egy sem, kiír egy üzenetet
- Bemenet: Bejelentkezett felhasználó, nincs játék a könyvtárban
- Művelet: Navigáljunk a könyvtár oldalra
- A képernyő közepén megjelenik, hogy nincs játék a könyvtárban


## 3. Tesztriportok (TR)

### 3.1. Játékok megjelenítése a könyvtárban tesztelése tesztriportjai

#### 3.1.1. TR-01 (TC-01)
- TP: TP-01
    1. lépés: Regisztráltam és bejelentkeztem az oldalra
    2. lépés: Az Áruház fülre rákattintottam
    3. lépés: Kiválasztottam egy tetszőleges játékot, majd rányomtam a Megtekintés gombra
    4. lépés: Rányomtam a Vásárlás gombra
    5. lépés: A Könyvtár fülre kattintottam
    6. lépés: Helyes eredményt kaptam: A játék megjelenik a listában és automatikusan kiválasztja, mivel egy van belőle
    

#### 3.1.2. TR-02 (TC-02)
- TP: TP-01
    1. lépés: Regisztráltam és bejelentkeztem az oldalra
    2. lépés: Az Áruház fülre rákattintottam
    3. lépés: Kiválasztottam egy tetszőleges játékot, majd rányomtam a Megtekintés gombra
    4. lépés: Rányomtam a Vásárlás gombra
    5. lépés: A 2-4. lépést megismételtem háromszor
    6. lépés: A Könyvtár fülre kattintottam
    7. lépés: Helyes eredményt kaptam: A játékok megjelennek a listában és automatikusan kiválasztja a legutolsó játékot, amit hozzáadtam a Könyvtárhoz

#### 3.1.3. TR-03 (TC-03)
- TP: TP-01
    1. lépés: Regisztráltam és bejelentkeztem az oldalra
    2. lépés: A Könyvtár fülre kattintottam
    3. lépés: Helyes eredményt kaptam: Azt írja ki, hogy "Nincsenek játékok a könyvtáradban"
