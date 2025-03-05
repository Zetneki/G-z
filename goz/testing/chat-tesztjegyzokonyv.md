# Tesztjegyzőkönyv - Chatelés Kezelése

Az alábbi tesztdokumentum a GŐZ projekthez tartozó 8.3.15. Chatelés kezelésének funkcióinak tesztelésére készült. Felelős: Borsodi Roland Dániel

## 1. Teszteljárások (TP)

### 1.1. Chat megnyitása funkció tesztelése

- **Azonosító:** TP-01
- **Tesztesetek:** TC-01, TC-02, TC-03, TC-04
- **Leírás:** Chat megnyitása funkció tesztelése
  0. lépés: Nyissuk meg az alkalmazást, és indítsuk el a chat funkciót
  1. lépés: Nyomjuk meg a "Chat megnyitása" gombot
  2. lépés: Ellenőrizzük, hogy a chat ablak helyesen megjelenik
  3. lépés: A felhasználó képes üzeneteket küldeni és fogadni a chaten
  4. lépés: Elvárt eredmény: A chat ablak megnyílik, és a felhasználó képes üzeneteket küldeni és fogadni.

### 1.2. Chat üzenet küldése és fogadása tesztelése

- **Azonosító:** TP-02
- **Tesztesetek:** TC-05, TC-06
- **Leírás:** Chat üzenet küldése és fogadása tesztelése
  0. lépés: Nyissuk meg az alkalmazást, és indítsuk el a chat funkciót
  1. lépés: Írjuk be az üzenetet a szövegmezőbe
  2. lépés: Nyomjuk meg a "Küldés" gombot
  3. lépés: Ellenőrizzük, hogy az üzenet helyesen megjelenik a chat ablakban
  4. lépés: Ellenőrizzük, hogy az üzenet a másik fél számára is megjelenik
  5. lépés: Elvárt eredmény: Az üzenet helyesen megjelenik mindkét fél chat ablakában

### 1.3. Chat lezárása funkció tesztelése

- **Azonosító:** TP-03
- **Tesztesetek:** TC-07, TC-08
- **Leírás:** Chat lezárása funkció tesztelése
  0. lépés: Nyissuk meg az alkalmazást, és indítsuk el a chat funkciót
  1. lépés: Nyomjuk meg a "Chat lezárása" gombot
  2. lépés: Ellenőrizzük, hogy a chat ablak bezárul
  3. lépés: Elvárt eredmény: A chat ablak bezárul, és a chat befejeződik

## 2. Tesztesetek (TC)

### 2.1. Chat megnyitása funkció tesztesetei

#### 2.1.1. TC-01

- **TP:** TP-01
- **Leírás:** Chat megnyitása funkció tesztelése
- **Művelet:** Nyomjuk meg a "Chat megnyitása" gombot
- **Elvárt eredmény:** A chat ablak megjelenik, és a felhasználó képes üzeneteket küldeni és fogadni

#### 2.1.2. TC-02

- **TP:** TP-01
- **Leírás:** Chat megnyitása funkció tesztelése
- **Bemenet:** Nincs aktív internetkapcsolat
- **Művelet:** Nyomjuk meg a "Chat megnyitása" gombot
- **Elvárt eredmény:** HIBA: Nincs internetkapcsolat, a chat nem nyitható meg

#### 2.1.3. TC-03

- **TP:** TP-01
- **Leírás:** Chat megnyitása funkció tesztelése
- **Bemenet:** Felhasználó már a chat oldalon van
- **Művelet:** Nyomjuk meg chatelés gombot
- **Elvárt eredmény:** A már megnyitott üzenőfal frissül

#### 2.1.4. TC-04

- **TP:** TP-01
- **Leírás:** Chat megnyitása funkció tesztelése
- **Bemenet:** A felhasználó nem jelentkezett be
- **Művelet:** Linken keresztül próbáljuk elérni a chatelés felületet
- **Elvárt eredmény:** HIBA: Bejelentkezés szükséges, session nélkül nem tudjuk megnyitni a chatet

### 2.2. Chat üzenet küldése és fogadása tesztesetei

#### 2.2.1. TC-05

- **TP:** TP-02
- **Leírás:** Chat üzenet küldése
- **Bemenet:** Üzenet = "Hawk Tuah"
- **Művelet:** Írjuk be az üzenetet a szövegmezőbe, és nyomjuk meg a "Küldés" gombot
- **Elvárt eredmény:** Az üzenet megjelenik a saját chat ablakunkban, és a másik fél is látja azt

#### 2.2.2. TC-06

- **TP:** TP-02
- **Leírás:** Chat üzenet fogadása
- **Bemenet:** A másik fél küld egy üzenetet
- **Művelet:** A felhasználó megnyitja a chat ablakot
- **Elvárt eredmény:** Az üzenet helyesen megjelenik a felhasználó chat ablakában

### 2.3. Chat lezárása funkció tesztesetei

#### 2.3.1. TC-07

- **TP:** TP-03
- **Leírás:** Chat lezárása funkció tesztelése
- **Művelet:** Lépjünk át másik ablakba
- **Elvárt eredmény:** A chat ablak bezárul, és a felhasználó átmegy az újonnan megnyitott ablakba

#### 2.3.2. TC-08

- **TP:** TP-03
- **Leírás:** Chat lezárása funkció tesztelése
- **Bemenet:** A felhasználó nem zárta le a chatet
- **Művelet:** A felhasználó újra próbálkozik a chat megnyitásával
- **Elvárt eredmény:** A chat ablak nem nyílik meg újra, amíg az előző chat aktív marad

## 3. Tesztriportok (TR)

### 3.1. Chat megnyitása funkció tesztriportjai

#### 3.1.1. TR-01 (TC-01)

- **TP:** TP-01
  1. lépés: "Chat megnyitása" gombot nyomtam meg
  2. lépés: A chat ablak helyesen megjelent
  3. lépés: Üzenetet írtam, és sikeresen küldtem el
  4. lépés: Helyesen működött, az üzenet megjelent a chat ablakban

#### 3.1.2. TR-02 (TC-02)

- **TP:** TP-01
  1. lépés: Internetkapcsolat nélkül próbáltam megnyitni a chatet
  2. lépés: Hibaüzenetet kaptam
  3. lépés: Helyesen működött, a rendszer nem engedte megnyitni a chatet

#### 3.1.3. TR-03 (TC-03)

- **TP:** TP-01
  1. lépés: Nyitott chat ablak mellett próbáltam újabbat megnyitni
  2. lépés: A meglévő chat ablakot hozta elő
  3. lépés: Helyesen működött, nem nyílt meg új chat ablak

### 3.2. Chat üzenet küldése és fogadása tesztriportjai

#### 3.2.1. TR-01 (TC-05)

- **TP:** TP-02
  1. lépés: Üzenetet küldtem a másik félnek
  2. lépés: Az üzenet helyesen megjelent a chat ablakban mind