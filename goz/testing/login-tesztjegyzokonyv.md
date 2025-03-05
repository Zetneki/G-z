# Tesztjegyzőkönyv-Bejelentkezés és Kijelentkezés

Az alábbi tesztdokumentum a GŐZ projekthez tartozó 8.3.4. Bejelentkezés és kijelentkezés funkcióihoz készült. Felelőse: Borsodi Roland Dániel

## 1. Teszteljárások (TP)

### 1.1. Bejelentkezés funkció tesztelése

- Azonosító: TP-01
- Tesztesetek: TC-01, TC-02, TC-03, TC-04
- Leírás: Bejelentkezés funkció tesztelése 0. lépés: Nyissuk meg az alkalmazást, és indítsuk el a bejelentkezés funkciót
  1. lépés: A FELHASZNÁLÓNÉV szövegbeviteli mezőbe írjunk be a USERNAME szöveget
  2. lépés: Az JELSZÓ szövegbeviteli mezőbe írjunk be a PASSWORD szöveget
  3. lépés: Nyomjuk meg a BEJELENTKEZÉS gombot
  4. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: Session elindítása, index-re átirányítás, hibás adatok esetén error üzenet

### 1.2. Kijelentkezés funkció tesztelése

- Azonosító: TP-02
- Tesztesetek: TC-01, TC-02
- Leírás: Kijelentkezés funkció tesztelése 0. lépés: Nyissuk meg az alkalmazást, és indítsuk el a kijelentkezésfunkciót
  1. lépés: Nyomjuk meg a kijelentkezés gombot
  2. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: session törlése, cookie eltávolítása

## 2. Teszesetek (TC)

### 2.1. Bejelentkezés funkció tesztesetei

#### 2.1.1. TC-01

- TP: TP-01
- Leírás: Bejelentkezés funkció tesztelése
- Bemenet: FELHASZNÁLÓNÉV = "Teszt Elek" ; PASSWORD = "tesztelek"
- Művelet: nyomjuk meg az BEJELENTKEZÉS gombot
- Elvárt eredmény: Session elindítása, index-re átirányítás

#### 2.1.2. TC-02

- TP: TP-01
- Leírás: Bejelentkezés funkció tesztelése
- Bemenet: FELHASZNÁLÓNÉV = "a" ; PASSWORD = "a"
- Művelet: nyomjuk meg az BEJELENTKEZÉS gombot
- Elvárt kimenet: HIBA: a FELHASZNÁLÓNÉV rövidebb mint 5 karakter

#### 2.1.3. TC-03

- TP: TP-01
- Leírás: Bejelentkezés funkció tesztelése
- Bemenet: FELHASZNÁLÓNÉV = "aaaaa" ; PASSWORD = "a"
- Művelet: nyomjuk meg az BEJELENTKEZÉS gombot
- Elvárt kimenet: HIBA: a JELSZÓ rövidebb mint 8 karakter

#### 2.1.3. TC-04

- TP: TP-01
- Leírás: Bejelentkezés funkció tesztelése
- Bemenet: FELHASZNÁLÓNÉV = "aaaaa" ; PASSWORD = "aaaaaaaa"
- Művelet: nyomjuk meg az BEJELENTKEZÉS gombot
- Elvárt kimenet: HIBA: Nincs ilyen felhasználó az adatbázisban

### 2.2. Kijelentkezés funkció tesztesetei

#### 2.2.1. TC-01

- TP: TP-02
- Leírás: Kijelentkezés funkció tesztelése
- Művelet: Bejelentkezünk, majd nyomjuk meg az KIJELENTKEZÉS gombot
- Elvárt eredmény: Session törlése, cookie eltávolítása

#### 2.2.1. TC-02

- TP: TP-02
- Leírás: Kijelentkezés funkció tesztelése
- Művelet: Nem jelentkezünk be, majd beírjuk a /logout-ot az url-be
- Elvárt eredmény: Session törlése, cookie eltávolítása, nem kapunk hibakódot

## 3. Tesztriportok (TR)

### 3.1. Összeadás funkció tesztriportjai

#### 3.1.1. TR-01 (TC-01)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "tesztelek"-et beírtam
  3. lépés: a gomb egyszeri megnyomás után átirányított az áruházra
  4. lépés: helyesen működött, session létrejött, index-re kerültem

#### 3.1.2. TR-02 (TC-02)

- TP: TP-01
  1. lépés: "a"-t beírtam
  2. lépés: "a"-t beírtam
  3. lépés: a gomb egyszeri megnyomás után hibaüzenetet kaptam
  4. lépés: helyesen működött, hibaüzenetet kaptam ami érthetően leírta a problémát

#### 3.1.2. TR-02 (TC-03)

- TP: TP-01
  1. lépés: "aaaaa"-t beírtam
  2. lépés: "a"-t beírtam
  3. lépés: a gomb egyszeri megnyomás után hibaüzenetet kaptam
  4. lépés: helytelenül működött, mert hibaüzenetet kaptam, de nem tudtam meg belőle mi a hiba

#### 3.1.2. TR-02 (TC-04)

- TP: TP-01
  1. lépés: "aaaaa"-t beírtam
  2. lépés: "aaaaaaaa"-t beírtam
  3. lépés: a gomb egyszeri megnyomás után hibaüzenetet kaptam
  4. lépés: helytelenül működött, mert hibaüzenetet kaptam, de nem tudtam meg belőle mi a hiba

### 3.2. Kijelentkezés emelés funkció tesztriportjai

#### 3.2.1. TR-01 (TC-01)

- TP: TP-02
  1. lépés: Bejelentkeztem a "Teszt Elek" profilba
  2. lépés: a gomb egyszeri megnyomás után kitörli a cookiet, session felbomlik
  3. lépés: helyesen működött, újra kijelentkezett állapotba vagyok, nincs a szerveren cookie

#### 3.2.1. TR-01 (TC-02)

- TP: TP-02
  1. lépés: a gomb egyszeri megnyomás után kitörli a cookiet, session felbomlik
  2. lépés: helyesen működött, kijelentkezett állapotba maradtam, nem kaptam hibakódot
