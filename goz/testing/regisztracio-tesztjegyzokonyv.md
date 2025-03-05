# Tesztjegyzőkönyv-Alapműveletek

Az alábbi tesztdokumentum a GŐZ projekthez tartozó 8.3.1 Regisztráció funkcióihoz készült. Felelőse: Kiss Gergely

## 1. Teszteljárások (TP)

### 1. Regisztráció funkció tesztelése

- Azonosító: TP-01
- Tesztesetek: TC-01, TC-02, TC-03, TC-04, TC-05, TC-06, TC-07, TC-08
- Leírás: regisztráció funkció tesztelése 0. lépés: Nyissuk meg az alkalmazást, és regisztráljunk
  1. lépés: Az `FELASZNALONEV` szövegbeviteli mezőbe írjunk be a `USERNAME` szöveget
  2. lépés: Az `EMAIL` szövegbeviteli mezőbe írjunk be a `EMAIL` szöveget
  3. lépés: Az `JELSZO` szövegbeviteli mezőbe írjunk be a `PASSWORD` szöveget
  4. lépés: Az `JELSZO_ISMETLES` szövegbeviteli mezőbe írjunk be a `PASSWORD_REPEAT` szöveget
  5. lépés: Nyomjuk meg az `REGISZTRÁCIÓ` gombot
  6. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: `index-re átirányítás, hibás adatok esetén error üzenet`

## 2. Teszesetek (TC)

### 2. Regisztráció funkció tesztesetei

#### 2.1. TC-01

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "Teszt Elek" ; `EMAIL` = "tesztelek@gmail.com" ; `PASSWORD` = "Aaaaaaa1" ; `PASSWORD_REPEAT` = "Aaaaaaa1"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: index-re átirányítás

#### 2.2. TC-02

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "" ; `EMAIL` = "" ; `PASSWORD` = "Aaaaaaa1" ; `PASSWORD_REPEAT` = "Aaaaaaa1"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: HIBA: nem adott meg minden értéket

#### 2.3. TC-03

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "Teszt Elek" ; `EMAIL` = "tesztelek@gmail.com" ; `PASSWORD` = "Aaaaaaa1" ; `PASSWORD_REPEAT` = "Aaaaaaa1"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: HIBA: a felhasználónév már foglalt

#### 2.4. TC-04

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "Teszt Elek" ; `EMAIL` = "nyalkahartyagyulladas" ; `PASSWORD` = "Aaaaaaa1" ; `PASSWORD_REPEAT` = "Aaaaaaa1"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: HIBA: nem megfelelő email-t adott meg

#### 2.5. TC-05

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "Teszt Elek" ; `EMAIL` = "tesztelek@gmail.com" ; `PASSWORD` = "Aaaaaaa1" ; `PASSWORD_REPEAT` = "Aaaaaaa1"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: HIBA: az email már foglalt

#### 2.6. TC-06

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "Teszt Elek" ; `EMAIL` = "tesztelek@gmail.com" ; `PASSWORD` = "Aaaaa1" ; `PASSWORD_REPEAT` = "Aaaaa1"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: HIBA: a jelszó rövidebb, mint 8 karakter

#### 2.7. TC-07

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "Teszt Elek" ; `EMAIL` = "tesztelek@gmail.com" ; `PASSWORD` = "aaaaaaaa" ; `PASSWORD_REPEAT` = "aaaaaaaa"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: HIBA: a jelszó nem tartalmaz nagybetűt, számot

#### 2.8. TC-08

- TP: TP-01
- Leírás: Regisztráció funkció tesztelése
- Bemenet: `USERNAME` = "Teszt Elek" ; `EMAIL` = "tesztelek@gmail.com" ; `PASSWORD` = "Aaaaaaa1" ; `PASSWORD_REPEAT` = "Bbbbbbb1"
- Művelet: nyomjuk meg az `REGISZTRÁCIÓ` gombot
- Elvárt kimenet: HIBA: a jelszavak nem egyeznek meg

## 3. Tesztriportok (TR)

### 3.1. Összeadás funkció tesztriportjai

#### 3.1. TR-01 (TC-01)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "tesztelek@gmail.com"-et beírtam
  3. lépés: "Aaaaaaa1"-et beírtam
  4. lépés: "Aaaaaaa1"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: az adatok felkerültek az adatbázisba

#### 3.2. TR-02 (TC-02)

- TP: TP-01

  1. lépés: ""-et beírtam
  2. lépés: ""-et beírtam
  3. lépés: "Aaaaaaa1"-et beírtam
  4. lépés: "Aaaaaaa1"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: helyesen működött, mert hibaüzenetet kaptam, nem adtam meg minden értéket

#### 3.3. TR-03 (TC-03)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "tesztelek@gmail.com"-et beírtam
  3. lépés: "Aaaaaaa1"-et beírtam
  4. lépés: "Aaaaaaa1"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: helyesen működött, mert hibaüzenetet kaptam, foglalt volt a felhasználónév

#### 3.4. TR-03 (TC-03)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "nyalkahartyagyulladas"-et beírtam
  3. lépés: "Aaaaaaa1"-et beírtam
  4. lépés: "Aaaaaaa1"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: helyesen működött, mert hibaüzenetet kaptam, nem megfelelő email címet adtam meg

#### 3.5. TR-03 (TC-03)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "tesztelek@gmail.com"-et beírtam
  3. lépés: "Aaaaaaa1"-et beírtam
  4. lépés: "Aaaaaaa1"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: helyesen működött, mert hibaüzenetet kaptam, foglalt volt az email

#### 3.6. TR-03 (TC-03)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "tesztelek@gmail.com"-et beírtam
  3. lépés: "Aaaaa1"-et beírtam
  4. lépés: "Aaaaa1"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: helyesen működött, mert hibaüzenetet kaptam, rövidebb jelszót adtam meg 8 karakternél

#### 3.7. TR-03 (TC-03)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "tesztelek@gmail.com"-et beírtam
  3. lépés: "aaaaaaaa"-et beírtam
  4. lépés: "aaaaaaaa"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: helyesen működött, mert hibaüzenetet kaptam, a jelszavam nem tartalmazott nagybetűt, számot

#### 3.3. TR-03 (TC-03)

- TP: TP-01
  1. lépés: "Teszt Elek"-et beírtam
  2. lépés: "tesztelek@gmail.com"-et beírtam
  3. lépés: "Aaaaaaa1"-et beírtam
  4. lépés: "Bbbbbbb1"-et beírtam
  5. lépés: a gomb egyszeri megnyomás után átirányított a főoldalra
  6. lépés: helyesen működött, mert hibaüzenetet kaptam, a megadott jelszavak nem egyeztek meg
