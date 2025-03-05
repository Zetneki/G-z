# Tesztjegyzőkönyv-Profilok kezelése

Az alábbi tesztdokumentum a GŐZ projekthez tartozó 8.3.2. Felhasználók adatainak módosítása funkcióihoz készült. Felelőse: Tar Máté Bence

## 1. Teszteljárások (TP)

### 1.1. Jelszó módosítás funkció tesztelése

- Azonosító: TP-01
- Tesztesetek: TC-01, TC-02, TC-03
- Leírás: Bejelentkezés funkció tesztelése
  0. lépés: Jelentkezzünk be és lépjünk a profil oldalra
  1. lépés: A Jelenlegi Jelszó szövegbeviteli mezőbe írjunk be a jelenlegi jelszavunkat
  2. lépés: Az Új Jelszó szövegbeviteli mezőbe írjunk be a kívánt, új jelszavunkat
  3. lépés: Nyomjuk meg a Jelszó módosítása gombot
  4. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: A profilhoz az új, kívánt jelszó van rendelve

### 1.2. Email cím módosítás funkció tesztelése

- Azonosító: TP-02
- Tesztesetek: TC-01, TC-02
- Leírás: Email cím módosítás funkció tesztelése
  0. lépés: Jelentkezzünk be és lépjünk a profil oldalra
  1. lépés: Az Email cím módosítása szövegbeviteli mezőbe írjunk be a kívánt, új e-mailt
  2. lépés: Nyomjuk meg az Email cím módosítása gombot
  3. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: A profilhoz az új, kívánt e-mail van rendelve

### 1.3. Profilkép feltöltés funkció tesztelése

- Azonosító: TP-03
- Tesztesetek: TC-01, TC-02, TC-03, TC-04, TC-05
- Leírás: Profilkép feltöltése funkció tesztelése
  0. lépés: Jelentkezzünk be és lépjünk a profil oldalra
  1. lépés: Válasszuk ki és töltsük fel a kívánt képet
  2. lépés: Nyomjuk meg a Kép feltöltése gombot
  3. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: A profilhoz az új, kívánt profilkép van rendelve

## 2. Teszesetek (TC)

### 2.1. Bejelentkezés funkció tesztesetei

#### 2.1.1. TC-01

- TP: TP-01
- Leírás: Jelszó módosítás funkció tesztelése
- Bemenet: Jelenlegi Jelszó: szeleP; Új Jelszó: szeleP123;
- Művelet: Nyomjuk meg az Jelszó módosítása gombot
- Elvárt eredmény: Bejelentkezésnél az új jelszó szükséges

#### 2.1.2. TC-02

- TP: TP-01
- Leírás: Jelszó módosítás funkció tesztelése
- Bemenet: Jelenlegi Jelszó: szeleP123; Új Jelszó: a;
- Művelet: Nyomjuk meg az Jelszó módosítása gombot
- Elvárt kimenet: HIBA: a JELSZÓ rövidebb mint 8 karakter

#### 2.1.3. TC-03

- TP: TP-01
- Leírás: Jelszó módosítás funkció tesztelése
- Bemenet: Jelenlegi Jelszó: a; Új Jelszó: asd1231234;
- Művelet: Nyomjuk meg az Jelszó módosítása gombot
- Elvárt kimenet: HIBA: Hibás jelenlegi jelszó

### 2.2. Email cím módosítás funkció tesztesetei

#### 2.2.1. TC-01

- TP: TP-02
- Leírás: Email cím módosítás funkció tesztelése
- Bemenet: janos@szelep.org
- Művelet: Nyomjuk meg az Email cím módosítása gombot
- Elvárt eredmény: Az e-mail cím módosul, ezt a profil adatoknál láthatjuk

#### 2.2.2. TC-02

- TP: TP-02
- Leírás: Email cím módosítás funkció tesztelése
- Bemenet: janosszeleporg
- Művelet: Nyomjuk meg az Email cím módosítása gombot
- Elvárt kimenet: HIBA: Az e-mail cím helytelen

### 2.3. Profilkép feltöltés funkció tesztesetei

#### 2.3.1. TC-01

- TP: TP-03
- Leírás: Profilkép feltöltés funkció tesztelése
- Bemenet: gaben.png
- Művelet: Nyomjuk meg a Kép feltöltése gombot
- Elvárt eredmény: A profilkép módosul, ezt a headerben láthatjuk

#### 2.3.2. TC-02

- TP: TP-03
- Leírás: Profilkép feltöltés funkció tesztelése
- Bemenet: gaben.jpg
- Művelet: Nyomjuk meg a Kép feltöltése gombot
- Elvárt kimenet: A profilkép módosul, ezt a headerben láthatjuk

#### 2.3.3. TC-03

- TP: TP-03
- Leírás: Profilkép feltöltés funkció tesztelése
- Bemenet: wallpaper.webp
- Művelet: Nyomjuk meg a Kép feltöltése gombot
- Elvárt kimenet: A profilkép módosul, ezt a headerben láthatjuk

#### 2.3.4. TC-04

- TP: TP-03
- Leírás: Profilkép feltöltés funkció tesztelése
- Bemenet: -
- Művelet: Nyomjuk meg a Kép feltöltése gombot
- Elvárt kimenet: HIBA: Nincs kiválasztott kép

#### 2.3.5. TC-05

- TP: TP-03
- Leírás: Profilkép feltöltés funkció tesztelése
- Bemenet: a.txt
- Művelet: Nyomjuk meg a Kép feltöltése gombot
- Elvárt kimenet: Nem enged feltölteni nem kép fájlt

## 3. Tesztriportok (TR)

### 3.1. Jelszó módosítása funkció tesztriportjai

#### 3.1.1. TR-01 (TC-01)

- TP: TP-01
  1. lépés: "szeleP"-et beírtam
  2. lépés: "szeleP123"-at beírtam
  3. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  4. lépés: bejelentkezésnél a jelszó helyesen megváltozott

#### 3.1.2. TR-02 (TC-02)

- TP: TP-01
  1. lépés: "szeleP"-et beírtam
  2. lépés: "a"-t beírtam
  3. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  4. lépés: A jelszó megváltozott. Ez hibás működés. A HTML-t javítottam, hogy elvárjon minimum 8 karaktert

#### 3.1.3. TR-03 (TC-03)

- TP: TP-01
  1. lépés: "a"-t beírtam
  2. lépés: "asd1231234"-et beírtam
  3. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  4. lépés: a hibaüzenet helyesen megjelent

### 3.2. Email cím módosítás funkció tesztriportjai

#### 3.2.1. TR-01 (TC-01)

- TP: TP-02
  1. lépés: "janos@szelep.org"-ot beírtam
  2. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  3. lépés: helyesen működött, a profil adatoknál az új e-mail cím látható

#### 3.2.2. TR-02 (TC-02)

- TP: TP-02
  1. lépés: "janosszeleporg"-ot beírtam
  2. lépés: a gomb egyszeri megnyomás után kírta, hogy @ szükséges, helyes működés

### 3.3. Profilkép feltöltés funkció tesztriportjai

#### 3.3.1. TR-01 (TC-01)

- TP: TP-03
  1. lépés: "gaben.png"-t feltöltöttem
  2. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  3. lépés: helyesen működött, a headerben az új profilkép látható

#### 3.3.2. TR-02 (TC-02)

- TP: TP-03
  1. lépés: "gaben.jpg"-t feltöltöttem
  2. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  3. lépés: helyesen működött, a headerben az új profilkép látható

#### 3.3.3. TR-03 (TC-03)

- TP: TP-03
  1. lépés: "wallpaper.webp"-t feltöltöttem
  2. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  3. lépés: helyesen működött, a headerben az új profilkép látható

#### 3.3.4. TR-04 (TC-04)

- TP: TP-03
  1. lépés: -
  2. lépés: Nem enged feltölteni fájl kiválasztása nélkül, helyes működés

#### 3.3.5. TR-05 (TC-05)

- TP: TP-03
  1. lépés: "a.txt"-t feltöltöttem
  2. lépés: a gomb egyszeri megnyomás után átirányított a profil oldalra
  3. lépés: helytelen működés, sikerült feltölteni txt fájlt, a validációt javítottam