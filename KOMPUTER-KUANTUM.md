# Apa itu Komputer Kuantum?

## Daftar Isi

* [Dari Komputer Klasik menuju Komputer Kuantum](#dari-komputer-klasik-menuju-komputer-kuantum)
* [Qubit](#qubit)
* [Klarifikasi](#klarifikasi)
* [Realisasi Komputer Kuantum](#realisasi-komputer-kuantum)
* [Atom Buatan (Super Atom)](#atom-buatan-super-atom)
* [Resonator sebagai Jembatan Multi-Fungsi](#resonator-sebagai-jembatan-multi-fungsi)
* [One-Qubit / Two-Qubits Gates](#one-qubit--two-qubits-gates)
* [Superposisi](#superposisi)
* [Keterikatan Qubit (Entanglement)](#keterikatan-qubit-entanglement)
* [Entanglement vs SWAP](#entanglement-vs-swap)
* [Interferensi](#interferensi)
* [Gerbang Kuantum](#gerbang-kuantum)
* [The Measurement Problem, Schrödinger Cat, Bohr vs. Einstein](#the-measurement-problem-schrödinger-cat-bohr-vs-einstein)
* [Konsep Quantum Supremacy](#konsep-quantum-supremacy)

---

_Jika kamu punya keahlian dibidang komputer kuantum baik secara keilmuan **fisika**, **kimia**, **elektro**, **informatika**, **sains komputer**, **matematika**, atau keilmuan lainnya, bantu kami memperbaiki catatan literasi Komputer Kuantum ini disini [Source Code](https://github.com/riochr17/apaitukomputerkuantum)_

## Dari Komputer Klasik menuju Komputer Kuantum

Komputer kuantum pertama kali saya dengar ketika masih kuliah dari dosen sekitar tahun 2015. Saat itu seingat saya beliau mengatakan komputer kuantum sudah mencapai 5-qubit  walaupun saya tidak paham apa itu 5-qubit yang dimaksud. Saya sempat mempelajari tentang komputer kuantum namun saya tidak ingat persis apa yang terjadi, yang saya pahami hanya sebatas komputer klasik itu bit (1 atau 0) sedangkan komputer kuantum itu quantum bit (1, 0, atau keduanya). Sekarang saya menyadari konsep 1, 0, atau keduanya itu sangat absurd jika diterapkan ke dalam komputer klasik secara langsung seperti disimpan di memori.

Pemahaman saya tentang qubit saat itu kira-kira seperti ini: jika dengan bit 1/0 kita bisa menyimpan dua kemungkinan data pada satu lokasi memori, maka dengan qubit bisa menyimpan tidak terhingga kemungkinan data pada satu lokasi memori, hahahah, memang saya cukup bodoh saat itu. Komputer kuantum tidak bekerja seperti itu. Hal bodoh lain yg dulu saya pikirkan: komputer kuantum itu akan menggantikan komputer klasik saat ini, literally seluruh peripherals diganti dengan komputer kuantum jadi keyboard, mouse, monitor dicolok ke komputer kuantum. Komputer kuantum saat ini masih sekedar device external dari komputer klasik, bisa dibayangkan seperti GPU, harus dihubungkan ke motherboard melalui interface seperti USB atau semacamnya dan ada software driver pengontrolnya.

Lalu seperti apa gambaran komputer kuantum itu jika dibandingkan dengan komputer komersil yang digunakan banyak orang saat ini?

Pada komputer biasa terdapat sebuah CPU yang sederhananya bertugas untuk melakukan kalkulasi menerima input lalu mengeluarkan output. Selain itu CPU juga memiliki registers untuk menyimpan sementara variabel perhitungan, namun kita abaikan dulu soal registers. Intinya kita yang perlu dipahami bahwa CPU disini memilki input di memori dalam bentuk deretan instruksi bahasa mesin (yang sebelumnya ditulis dalam bahasa assembly) lalu mengeksekusi setiap instruksi tersebut ke CPU. Setiap instruksi yang dieksekusi menghasilkan output yang ditulis ke memori.

```
[Memory] --instruksi--> [CPU] --output--> [Memory]
                          |
                          |
            +-------------+---------------+
            | CPU juga                    |
            | membaca data dari memori    |
            | pada instruksi tertentu     |
            +-----------------------------+
```

Misal sebuah komputer kuantum saya sebut QPU, jika digambarkan seperti CPU bentuknya seperti berikut:

```
QPU
+---------------------------------------------------------------------------------+
| [Controller Input] --instruksi--> [Qubit] <--read-output-- [Controller Readout] |
+---------------------------------------------------------------------------------+
```

QPU ini adalah istilah yang saya buat sendiri untuk menggambarkan sebuah chip komputer kuantum yang berisi banyak qubits di dalamnya, beserta hardware pendukung lainnya, dan dapat melakukan tujuannya (utk melakukan kalkulasi). Pada QPU yang saya gambarkan, QPU menerima instruksi melalui sebuah alat yang saya sebut sebagai Controller Input, lalu Controller Input memanipulasi qubit, lalu nilai akhir qubit dibaca oleh Controller Readout. Terdapat arah panah yang berbeda dari Controller Readout ke qubit, disini saya coba menegaskan bahwa qubit tidak mengirim data ke Controller Readout, melainkan Controller Readout yang membaca hasil ke qubit.

Pada CPU ada modul-modul dasar seperti: Adder, Carry, Shifter, Multiplexer, Register, Decoder, dll. Seluruh modul-modul dasar tersebut ketika dikombinasikan bisa menghasilkan fungsi yang sangat kompleks seperti perkalian, pangkat, eksponen, baca tulis memori, dan banyak lagi. Sebaliknya, jika kita lihat lebih detail, misalnya modul Adder itu terdiri dari kombinasi gerbang logika (logic gates): XOR, AND, dan OR. Berikut saya tampilkan skema modul half adder:

```
A -------------+----------\
               |           )---[ XOR ]---- SUM (S)
B --------+----|----------/
          |    |
          |    +---------------\
          |                     )---[ AND ]---- CARRY (C)
          +--------------------/

Jika A = 1, B = 0, maka hasilnya
- SUM   = A XOR B = 1 XOR 0 = 1
- CARRY = A AND B = 1 AND 0 = 0

Contoh lain A = 1, B = 1, maka hasilnya
- SUM   = A XOR B = 1 XOR 1 = 0
- CARRY = A AND B = 1 AND 1 = 1
```

Pada QPU gerbang logika (logic gates) digantikan dengan istilah lain yaitu gerbang kuantum (quantum gates). Gerbang kuantum ini memiliki prinsip dasar yang sama dengan gerbang logika, yaitu untuk melakukan sebuah operasi. Namun operasi antara gerbang logika dan gerbang kuantum sedikit berbeda dari segi proses dan tujuannya. Pada gerbang logika, input diproses menjadi output, sedangkan pada gerbang kuantum input diproses untuk memanipulasi keadaan kuantum qubit.

```
CPU:
Instruksi --> [Gerbang Logika memproses perhitungan] --> Output ke memory

QPU:
Instruksi --> [Gerbang Kuantum memanipulasi qubit] --> (keadaan kuantum qubit berubah,
                                                         pada tahap ini tidak ada output)
```

Untuk memahami lebih lanjut, kita coba eksplorasi terkait proses gerbang logika pada CPU. Berikut adalah skema dari Full Adder:

```
A  ----\
        ) [ half_adder_1 ] ---- (sum1) ---\
B  ----/         |                         \
                 |                          ) [ half_adder_2 ] ----> SUM AKHIR (S)
                 |                         /        |
Cin ------------ | -----------------------/         |
                 |                                  | carry2
                 |                                  |
                 \----------- [ OR_GATE ] <---------/
                  carry1          |
                                  +-----------------------> CARRY OUT (Cout)
```

Modul Full Adder terdiri dari 2 buah half adder dan satu gerbang logika OR, yang artinya pada CPU modul yang lebih kompleks disusun dari modul lain atau gerbang logika lain. Disini juga bisa dipahami bahwa output dari sebuah gerbang logika dapat digunakan sebagai input oleh gerbang logika berikutnya. Salah satu letak perbedaan utama gerbang logika dan gerbang kuantum ada disini. Pada gerbang kuantum tidak ada output yang dapat digunakan oleh gerbang kuantum berikutnya sebagai input. Gerbang kuantum hanya memiliki satu kegunaan, yaitu memodifikasi keadaan kuantum dari qubit. Disini mungkin alurnya sudah mulai membingungkan karena saya belum memberikan gambaran seperti apa itu qubit dan mengapa harus diubah keadaan kuantumnya.

Sebelum kita lebih jauh mengekplorasi tentang qubit, saya akan berikan gambaran mengenai contoh kasus penggunaan CPU.

**Kasus 1**: Hitung hasil dari penjumlahan `p = a + b + c`

pada kasus ini kita bisa menuliskan solusi bahasa assembly seperti berikut:

```asm
section .data
    a dd 10          ; Mendefinisikan variabel a dengan nilai 10
    b dd 20          ; Mendefinisikan variabel b dengan nilai 20
    c dd 30          ; Mendefinisikan variabel c dengan nilai 30
    p dd 0           ; Tempat menyimpan hasil p

section .text
    global _start

_start:
    ; 1. Pindahkan nilai 'a' ke register EAX
    mov eax, [a]     

    ; 2. Tambahkan nilai 'b' ke dalam EAX (EAX sekarang berisi a + b)
    add eax, [b]     

    ; 3. Tambahkan nilai 'c' ke dalam EAX (EAX sekarang berisi a + b + c)
    add eax, [c]     

    ; 4. Simpan hasil akhir dari EAX ke variabel 'p'
    mov [p], eax     

    ; (Logika untuk keluar/exit program biasanya ada di sini)
```

Jika diterjemahkan ke dalam modul-modul CPU maka kurang lebih seperti berikut:

```
Tahap 1: Inisialisasi dan Pemuatan Data (MOV EAX, a)
1. Control Unit (CU) mengambil instruksi dari memori.
2. Instruction Decoder menerjemahkan instruksi sebagai operasi pemindahan data
3. MAR (Memory Address Register) mengirimkan alamat variabel a ke RAM.
4. Data Bus membawa nilai a dari RAM ke CPU.
5. Register File menyimpan nilai a ke dalam Register EAX.

Tahap 2: Operasi Aritmatika Pertama (ADD EAX, b)
6. Instruction Decoder menerjemahkan instruksi sebagai operasi penjumlahan.
7. Control Unit mengaktifkan jalur input ALU.
8. Register File menyalurkan nilai a (dari EAX) ke Input A pada ALU.
9. Data Bus menyalurkan nilai b dari RAM ke Input B pada ALU.
10. ALU melakukan kalkulasi biner untuk $a + b$, dilakukan menggunakan Full Adder.
11. Register File menuliskan hasil penjumlahan tersebut kembali ke dalam Register EAX.

Tahap 3: Operasi Aritmatika Kedua (ADD EAX, c)
12. Instruction Decoder menerjemahkan instruksi penjumlahan berikutnya.
13. Register File menyalurkan hasil sementara ($a+b$) dari EAX ke Input A pada ALU.
14. Data Bus menyalurkan nilai c dari RAM ke Input B pada ALU.
15. ALU melakukan kalkulasi biner untuk $(a + b) + c$.
16. Status Register (Flags) mencatat jika terjadi carry atau overflow.
17. Register File menyimpan hasil akhir total ke dalam Register EAX.

Tahap 4: Penyimpanan Hasil Akhir (MOV p, EAX)
18. Instruction Decoder menerjemahkan instruksi sebagai operasi penyimpanan (Store).
19. MAR menetapkan alamat tujuan pada variabel p di RAM.
20. Register File mengeluarkan hasil akhir dari EAX ke Data Bus.
21. Memory Unit (RAM) menuliskan data dari bus ke dalam alamat p.
```

**Kasus 2**: Hitung, jika bilangan habis dibagi dua tampilkan 1 jika tidak habis tampilkan -1

Dalam assembly kasus di atas ditulis menjadi kode berikut:

```asm
section .data
    angka dd 10          ; Bilangan yang akan dicek
    hasil dd 0           ; Tempat menyimpan 1 atau -1

section .text
    global _start

_start:
    mov eax, [angka]     ; Ambil angka
    test eax, 1          ; Lakukan bitwise AND dengan 1 (cek bit terakhir)
    jz genap             ; Jika hasil 0 (Zero Flag set), lompat ke label genap

    ; Jika Ganjil:
    mov ebx, -1          ; Masukkan -1 ke register
    jmp simpan           ; Lompat ke proses simpan

genap:
    ; Jika Genap:
    mov ebx, 1           ; Masukkan 1 ke register

simpan:
    mov [hasil], ebx     ; Simpan isi ebx ke variabel hasil
```

dari dua kasus di atas kita lihat contoh dua use-cases (kasus penggunaan) CPU itu untuk operasi matematika dan kondisional output. Lalu bagaimana dengan komputer kuantum, apakah komputer kuantum melakukan hal yang sama? Jawabannya QPU memiliki kapabilitas yang berbeda dibandingkan dengan CPU. Apakah komputer kuantum dapat melakukan operasi matematika dan kondisional output? Bisa, tetapi komputer kuantum tidak ditujukan untuk melakukan operasi matematika atau kondisional output, tetapi lebih cocok untuk kasus lain. Kasus seperti apa yang cocok utk komputer kuantum akan saya bahas berikutnya setelah saya menjelaskan tetang qubit terlebih dahulu.

Sebelum membahas qubit saya ingin menegaskan bahwa CPU bekerja dengan mengeksuksi setiap instruksi dari memori satu per satu lalu menyimpan hasil dari setiap instruksi ke memori lagi. CPU mengeksekusi instruksi menggunakan gerbang logika yang ada di dalam CPU.

```
[Memory] --instruksi-1--> [CPU] --output-1--> [Memory]
[Memory] --instruksi-2--> [CPU] --output-2--> [Memory]
[Memory] --instruksi-3--> [CPU] --output-3--> [Memory]
...dst
```

Pada komputer kuantum konsep ini sedikit berbeda, controller input memang memiliki konsep instruksi yang hampir sama seperti CPU, namun pada QPU dan Controller Readout berbeda. QPU berisi qubit-qubit yang menyimpan keadaan kuantum dan tidak ada gerbang kuantum di dalam qubit, akan saya jelaskan lebih detail tentang qubit setelah ini. Controller Readout membaca keadaan kuantum dari qubit di QPU kapanpun dan biasanya dibaca di akhir setelah seluruh instruksi dijalankan, namun tidak menutup kemungkinan membaca di tengah proses instruksi berlangsung.

```
[Controller Input] --instruksi-1--> [Qubit]
[Controller Input] --instruksi-2--> [Qubit]
[Controller Input] --instruksi-3--> [Qubit]
[Controller Input] --instruksi-4--> [Qubit] <--read-output-Q1-- [Controller Readout]
[Controller Input] --instruksi-5--> [Qubit]
[Controller Input] --instruksi-6--> [Qubit] <--read-output-Q2,Q3,Q4-- [Controller Readout]
```


Kita kembali ke skema awal komputer kuantum

```
QPU: 
Instruksi --> [Gerbang Kuantum memanipulasi qubit] --> (keadaan kuantum qubit berubah,
                                                        pada tahap ini tidak ada output)
```

Perlu diingat bahwa instruksi yang akan dikirim ke QPU jika dibreakdown akan berisi gerbang kuantum, seperti instruksi pada CPU yang jika dibreakdown akan berisi gerbang logika.

Pada CPU gerbang logika: `AND`, `XOR`, `NOT`, `OR`, dll.

Pada QPU gerbang kuantum: `X`, `Y`, `Z`, `H`, `CNOT`, `SWAP`, dll.

Untuk menjalankan gerbang logika `AND`, maka harus tersedia rangkaian logika `AND` yang terdiri dari 2 transistor PMOS dan 2 transistor NMOS disusun sedemikian rupa agar menghasilkan keluaran logika `AND`. Input dari instruksi gerbang logika `AND` akan dikirim ke rangkaian transistor tersebut dan menghasilkan output. Sama halnya dengan `OR` membutuhkan rangkaian transistor `OR` yang berbeda bentuknya dari `AND`, sama halnya dengan `XOR`, `NOT`, dll. Disini kita bisa lihat pola utk menjalankan gerbang logika, maka masing-masing rangkaian transistor yang berbeda-beda untuk setiap gerbang logika tersebut harus tersedia di CPU.

Hal ini sangat kontras dengan komputer kuantum. Setiap jenis gerbang kuantum tidak memerlukan rangkaian khusus untuk menjalankannya, melainkan cukup diterapkan langsung pada qubit. Disini ada sedikit perbedaan istilah "dijalankan" (pada CPU) dan "diterapkan" (pada QPU). Pada QPU, qubit tidak menjalankan instruksi, yang terjadi adalah Controller Input mengirimkan sebuah sinyal/microwave pulse ke qubit dan tindakan ini mengubah keadaan kuantum qubit. Misal ketika ada instruksi `H`, maka `H` tersebut langsung diterapkan pada qubit dan mengubah quantum state-nya, begitu juga instruksi lain seperti `CNOT`, `Z`, dan lainnya. Apa yang dimaksud dengan menerapkan gerbang kuantum `H` pada qubit? Kita bahas tentang qubit.

  ## Qubit

Pada teori komputer kuantum yang saya pahami, qubit digambarkan sebagai atom. Atom yang dimaksud disini adalah atom yang sama dengan yg dulu kita pelajari di pelajaran kimia SMA. Jujur saya tidak terlalu mendalami terkait teori atom, tapi saya akan coba jelaskan kaitannya dengan qubit yang saya pahami. Qubit erat hubungannya dengan elektron valensi (elektron di kulit terluar atom). Pada dasarnya elektron valensi memiliki tingkatan energi:

```
E0 (ground state) -> keadaan dasar
E1 (first excitation) -> tingkat eksitasi pertama
E2 (second excitation) -> tingkat eksitasi kedua
...dst
```

Pada komputer kuantum, tingkatan energi elektron valensi dimodelkan menjadi seperti bit: E0 bernilai 0 dan E1 bernilai 1. Tingkatan energi lain E2, E3, dst itu diabaikan, mengapa diabaikan? saya dapat banyak penjelasan yang tidak memuaskan dan saya tidak terlalu paham hingga saat ini, kalian coba cari tahu mengapa hanya E0 dan E1. Beberapa jawaban mengatakan untuk simplifikasi dan alasan kompatibilitas dengan cara kerja bit pada komputer. Ada jawaban lain yang mengatakan karena tingkatan energi selain E0 dan E1 tidak terlalu berpengaruh.

Jika kalian pernah mendengar qubit itu bisa bernilai 0, 1, atau keduanya, maka tingkatan energi elektron valensi inilah yang dimaksud oleh hal tersebut. Jadi yang dijadikan ukuran bit pada qubit itu adalah tingkatan energi elektron valensi. Tingkatan energi elektron valensi bisa dalam keadaan dasar (ground state / nilai 0), bisa dalam tingkat eksitasi pertama (nilai 1), atau bisa dikeduanya (yang disebut keadaan **superposisi**). Saya dulu membayangkan apa yang dimaksud dengan superposisi ini secara fisik, apakah bola elektronnya berada ditengah2 antara E0 dan E1? Ternyata bukan, disini kita tidak bisa membayangkan elektron sebagai bola yang bergeser-geser dari E0 ke E1 karena memang aktualnya bukan bola, tetapi posisi tingkat energi elektron valensi tersebut harus dibayangkan sebagai gelombang, tepatnya gelombang kuantum. Pada kondisi superposisi, gelombang kuantum elektron valensi memiliki campuran kedua energi E0 dan E1 sehingga tidak dapat dituliskan 0 atau 1 saja melainkan keduanya. Selain tingkat energi E0 dan E1, pada atom juga terdapat fase, untuk fase saya jujur tidak bisa membayangkan bentuknya seperti apa pada atom, hampir semua penjelasan yang saya baca berakhir di teori dan formula matematika. Kemampuan saya untuk menjelaskan atom, elektron valensi, dan fase hanya sebatas ini, untuk informasi lebih lanjut kalian bisa berdiskusi dengan ahli di bidangnya atau mencari literasi terkait ini.

Di atas saya sudah membahas tentang tingkatan energi elektron valensi dan fase. Pada komputer kuantum dua karakteristik atom ini dimodelkan menjadi qubit. Tingkatan energi disebut amplitudo (dengan min = E0 dan max = E1), dan fase tetap disebut fase. Qubit ini digambarkan menggunakan istilah Bloch Sphere (bola Bloch) seperti sebuah bola dengan 3 sumbu: X, Y, dan Z.

![Bloch Sphere](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bloch_Sphere_representation.svg/1280px-Bloch_Sphere_representation.svg.png)

Pada bola Bloch terdapat beberapa variabel seperti phi (φ), psi (ψ), theta (θ). ψ merupakan keadaan kuantum dari qubit atau istilah sederhananya amplitudo dari qubit. φ adalah kondisi fase qubit. θ sudut polar keadaan kuantum dari ψ terhadap keadaan dasar (E0). Ketiga variabel ini dirumuskan menjadi sebuah rumus keadaan kuantum. Saya tidak akan membahas banyak mengenai rumus disini, karena fokus saya disini menjelaskan qubit dalam konteks fisik dan cara kerjanya dibandingkan dengan komputer klasik.

Ketika kita kembali melihat komputer klasik, sebuah operasi seperti ini:

```
f(a,b,c) = a + b + c
```

dilakukan dengan menguraikan rumus `f(a,b,c)` menjadi instruksi bahasa mesin. Lalu instruksi bahasa mesin tersebut disimpan ke memori dan satu per satu dieksekusi oleh CPU melalui operasi gerbang logika yang sudah tersedia pada CPU. Hasil operasi ini biasanya disimpan kembali ke memori. Sebelum dieksekusi menjadi pada gerbang logika, bahasa mesin yang dikirim seperti `ADD`, `JMP`, dan lainnya akan dipetakan menjadi beberapa micro-ops seperti `load`, `add`, `store`, lalu micro-ops yang tersusun dari gerbang-gerbang logika mengeksekusi instruksi.

```
1. f(a,b,c) -> diterjemahkan menjadi instruksi bahasa mesin
2. instruksi bahasa mesin -> dikirim ke CPU satu per satu
3. CPU menerima instruksi lalu memetakan instruksi menjadi beberapa micro-ops
4. CPU menjalankan seluruh micro-ops dari sebuah instruksi
```

Pada komputer kuantum proses yang sama dilakukan dengan mendekomposisi permasalahan ke bahasa mesin kuantum. Namun bahasa mesin kuantum ini tidak dikirim ke QPU tetapi bahasa mesin kuantum tersebut diterjemahkan lagi ke deretan instruksi gerbang kuantum. Deretan instruksi gerbang kuantum ini lalu dieksekusi oleh Controller Input.

## Klarifikasi

Sekarang mulai terlihat membingungkan tentang QPU, gerbang logika, gerbang kuantum, dan Controller Input.

Saya perlu klarifikasi beberapa hal disini:
- QPU disini bukan Quantum Processing Unit seperti yang kalian baca di Internet, ini adalah istilah yang saya buat sendiri untuk simplifikasi agar bisa bandingkan antara CPU dan QPU.
- Pada komputer klasik instruksi paling atomik berakhir di bahasa mesin, sisanya dikirim dan langsung bisa dijalankan oleh CPU. Urusan bagaimana cara menjalankan gerbang logika oleh micro-ops sudah diatur oleh CPU, bahkan kebanyakan sudah diatur perkabelannya di CPU sejak awal oleh pembuat CPU-nya.
- Pada komputer kuantum, hingga saat ini tidak ada bahasa mesin komputer kuantum, yang ada bahasa pemrograman kuantum (inilah yang saya sebut sebagai bahasa mesin kuantum tadi).
- Bahasa pemrograman kuantum ini diterjemahkan lagi menjadi instruksi gerbang kuantum oleh compilernya. Nah disini kita bisa lihat cukup jelas perbedaannya, pada komputer klasik bahasa pemrograman tidak pernah diterjemahkan sampai gerbang logika tetapi sampai instruksi bahasa mesin saja.

```
Komputer klasik:
Bahasa progam -> assembly -> bahasa mesin --(dikirim)--> ke CPU

logic gate terdapat di dalam CPU

Komputer kuantum:
Bahasa program -> quantum gate --(dikirim)--> ke Controller Input
```

- Bukankah Controller Input itu bagian dari QPU? Saya tegaskan lagi tidak ada fisik QPU yang bisa dibayangkan disini. Saya membayangkan Controller Input itu sebuah micro-controller yang memanipulasi keadaan kuantum qubit dengan suatu metode tertentu. Seluruh bagian komputer kuantum yang saya gambarkan sebelumnya seperti Controller Input, qubit-qubit, Controller Readout merupakan perangkat keras yang terpisah-pisah.

## Realisasi Komputer Kuantum

Mengapa komputer kuantum tidak seperti komputer klasik yang memiliki bahasa mesin? Menurut pendapat saya, karena komputer kuantum hingga saat ini masih dalam pengembangan sehingga pada _state-of-the-art_ saat ini yang paling praktis adalah dengan langsung mengeksekusi gerbang kuantum tanpa bahasa mesin kuantum khusus. Kedepannya mungkin saja dikembangkan bahasa mesin khusus untuk komputer kuantum.

Saya tidak mengetahui persis bagaimana proses eksekusi gerbang kuantum di komputer kuantum terjadi secara eksplisit. Namun saya menduga prosesnya harusnya kurang lebih seperti ini:
1. Program dijalankan di komputer biasa, di-*compile*, dan menghasilkan deretan gerbang kuantum yang dimengerti oleh Controller Input dan siap dieksekusi.
2. Instruksi gerbang kuantum dikirim melalui usb (atau interface lain) dalam bentuk instruksi raw binary yang mirip bahasa mesin ke Controller Input. Pada kondisi ini Controller Input sudah diatur untuk mengenali instruksi-instruksi gerbang kuantum tersebut.
3. Controller Input menerima instruksi gerbang kuantum lalu melakukan manipulasi qubit. Pada tahap ini Controller Input dan qubit sudah terhubung melalui sebuah medium, apakah itu kabel serat optik, kabel listrik, atau apapun itu saya tidak tahu persis.

Setelah ini saya akan coba membahas tentang bus komunikasi antara Controller Input-qubit-Controller Readout, kita bahas setelah bahasan tentang instruksi gerbang kuantum.

Tools untuk melakukan pemrograman komputer kuantum yang paling populer saat ini adalah Qiskit. Lebih tepatnya Qiskit ini bukan bahasa pemrograman tetapi sebuah tools library di python (Qiskit SDK).

> Mengapa blm ada bahasa pemrograman khusus komputer kuantum? Alasan yang paling masuk akal menurut saya adalah terlalu dini. Effort yang dikeluarkan utk menulis bahasa pemrograman baru untuk komputer kuantum yang blm pasti wujud komersilnya terkesan tergesa-gesa. Dalam mengoperasikan qubit saat ini cara dengan memanfaatkan bahasa pemrograman yang sudah ada merupakan strategi yang praktis dan meminimalisir penggunaan resource yang sia-sia.

Berikut contoh kode program komputer kuantum yang saya ambil dari github [https://github.com/Qiskit/qiskit](https://github.com/Qiskit/qiskit).

```python
import numpy as np
from qiskit import QuantumCircuit

# 1. A quantum circuit for preparing the quantum state |000> + i |111> / √2
qc = QuantumCircuit(3)
qc.h(0)             # generate superposition
qc.p(np.pi / 2, 0)  # add quantum phase
qc.cx(0, 1)         # 0th-qubit-Controlled-NOT gate on 1st qubit
qc.cx(0, 2)         # 0th-qubit-Controlled-NOT gate on 2nd qubit
```

Jika variabel `qc` diprint, maka hasilnya seperti berikut:

```
     ┌───┐┌────────┐
q_0: ┤ H ├┤ P(π/2) ├──■────■──
     └───┘└────────┘┌─┴─┐  │
q_1: ───────────────┤ X ├──┼──
                    └───┘┌─┴─┐
q_2: ────────────────────┤ X ├
                         └───┘
```

`H`, `P`, dan `CNOT(■-X)` merupakan gerbang kuantum. `q_0`, `q_1`, `q_2` adalah representasi dari 3 buah qubit.

Namun kode contoh di atas belum menjalankan proses kalkulasi kuantum, baru hanya sedekar melakukan setup (mempersiapkan) rancangan gerbang kuantum. Pada repository github yang sama juga diberikan contoh untuk menjalankan rancangan gerbang kuantum tersebut, kode lengkapnya menjadi:

```python
import numpy as np
from qiskit import QuantumCircuit

# 1. A quantum circuit for preparing the quantum state |000> + i |111> / √2
qc = QuantumCircuit(3)
qc.h(0)             # generate superposition
qc.p(np.pi / 2, 0)  # add quantum phase
qc.cx(0, 1)         # 0th-qubit-Controlled-NOT gate on 1st qubit
qc.cx(0, 2)         # 0th-qubit-Controlled-NOT gate on 2nd qubit

# 2. Add the classical output in the form of measurement of all qubits
qc_measured = qc.measure_all(inplace=False)

# 3. Execute using the Sampler primitive
from qiskit.primitives import StatevectorSampler
sampler = StatevectorSampler()
job = sampler.run([qc_measured], shots=1000)
result = job.result()
print(f" > Counts: {result[0].data['meas'].get_counts()}")
```

sekarang ketika dijalankan kita bisa melihat hasil dari proses kalkulasi kuantum, jika saya jalankan hasilnya kurang lebih seperti berikut:

```
 > Counts: {'111': 505, '000': 495}
```

Banyak pasti yang bertanya-tanya ini hasil apa? Komputer kuantum seperti ini saja? Fungsinya apa kalau hanya seperti ini? Sambil berjalan saya akan coba jawab satu per satu.

Output program kuantum di atas dapat diinterpretasikan dengan
- nilai 111 (=8 dalam integer) memiliki probabilitas sebesar 50.5%, dan 
- nilai 000 (=0 dalam integer) memiliki probabilitas 49.5%.

Komputer kuantum tidak menyelesaikan masalah seperti yang diselesaikan oleh komputer klasik seperti penjumlahan, pengurangan, perkalian, dll. Ini yang saya sebutkan di awal bahwa domain permasalahan yang diselesaikan oleh komputer kuantum berbeda dengan komputer klasik.

Jika kita perhatikan pada kode program di atas, maka terdapat satu bagian yang menuliskan `sampler.run(..., shots=1000)`, apa artinya `shots=1000`? Komputer kuantum bekerja dengan menghitung probabilitas hasil, apa maksudnya probabilitas hasil? Kita coba lihat potongan kode berikut:

```python
qc_measured = qc.measure_all(inplace=False)
```

apa yang terjadi ketika dilakukan pengukuran disini? Secara persis saya tidak tahu, namun saya coba gambarkan apa yg saya pahami:
1. 4 buah gerbang kuantum (sesuai hasil print di atas) dikirim ke Controller Input
2. Controller Input menjalankan instruksi satu per satu dan melakukan manipulasi qubit
3. Controller Readout membaca isi ketiga qubit.
4. Muncul hasil `q_0 = 1`, `q_1 = 1`, `q_2 = 1`

Satu `shots` itu merupakan satu alur full instruksi mulai 1 hingga 4. Lalu mengapa dilakukan hingga 1000 kali jika satu `shots` sudah mengeluarkan hasil? Jawabannya karena ketika satu full cycle instruksi itu dijalankan ulang hasilnya belum tentu sama, misal:

| Shots | `q_0` | `q_1` | `q_2` |
| ----- | ----- | ----- | ----- |
| 1st   | 1     | 1     | 1     |
| 2nd   | 0     | 0     | 0     |
| 3rd   | 1     | 1     | 1     |
| 4th   | 1     | 1     | 1     |
| 5th   | 0     | 0     | 0     |
| 6th   | 1     | 1     | 1     |
| ...   | ..    | ..    | ..    |

Ini merupakan bagian yang sangat berbeda antara komputer klasik dan komputer kuantum. Dari 1000 kali proses full cycle instruksi didapatkan hasil probabilitas:

```
111 -> 50.5%
000 -> 49.5%
```

Untuk lebih memahami tentang domain permasalahan pada komputer kuantum kita akan coba menyelesaikan sebuah permasalahan berikut:

Misalkan terdapat sebuah hash password `e73acf9930`, lalu kita ingin tau plain text dari hash tersebut apa. Pada komputer klasik kita harus menjalankan semua kemungkinan kombinasi hash dari semua karakter yang mungkin, dalam pseudocode kurang lebih seperti berikut:

```
function hash(plain) -> chiper:
  result = someprocess(plain)
  return result

target_hash = "e73acf9930"
for each pass of every combination N-digits characters:
  is_password_match = hash(pass) === target_hash
  if is_password_match:
    print("Password found: " + pass)
    break
```

Namun untuk simplifikasi masalah dan kepraktisan contoh, saya akan defisinikan sebuah fungsi hash sederhana namun tetap pada domain permasalahan yang sama. Misalkan fungsi hash dari sebuah password sbb:

```
f(plain) = plain + 1
```

dengan `plain` adalah bilangan bulat antara 0 sampai 6. Bagaimana cara menyelesaikan permasalahan ini di pemrograman komputer kuantum? Salah satu solusinya dengan menggunakan algoritma Grover seperti berikut:

```python
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

def add_one_circuit(circuit, qr):
    """
    Applies x = x + 1 to a 3-qubit register.
    This uses a simplified carry logic for 3 bits.
    """
    circuit.ccx(qr[0], qr[1], qr[2]) # Carry to bit 2
    circuit.cx(qr[0], qr[1])         # Carry to bit 1
    circuit.x(qr[0])                 # Increment bit 0
    return circuit

def create_f_x_oracle(target_y):
    """
    Oracle for f(x) = x + 1. 
    It checks if x + 1 == target_y.
    """
    qc = QuantumCircuit(3)
    
    # 1. Compute f(x) = x + 1
    add_one_circuit(qc, [0, 1, 2])
    
    # 2. Check if the result matches target_y
    # Flip bits that are '0' in target_y so that the target state becomes |111>
    binary_y = format(target_y, '03b')[::-1]
    for i, bit in enumerate(binary_y):
        if bit == '0':
            qc.x(i)
            
    # 3. Phase Kickback (Multi-Controlled Z)
    qc.h(2)
    qc.ccx(0, 1, 2)
    qc.h(2)
    
    # 4. Reverse the bit flips
    for i, bit in enumerate(binary_y):
        if bit == '0':
            qc.x(i)
            
    # 5. Uncompute f(x) = x + 1 to return to the original x basis
    # The inverse of (+1) is (-1). For a 3-bit circuit:
    qc.x(0)
    qc.cx(0, 1)
    qc.ccx(0, 1, 2)
    
    return qc

def create_diffuser():
    qc = QuantumCircuit(3)
    qc.h([0, 1, 2])
    qc.x([0, 1, 2])
    qc.h(2)
    qc.ccx(0, 1, 2)
    qc.h(2)
    qc.x([0, 1, 2])
    qc.h([0, 1, 2])
    return qc

# --- Execution ---
target_y = 5 # We want to find x such that x + 1 = 5 (Answer should be 4)
main_qc = QuantumCircuit(3, 3)

# Initial Superposition
main_qc.h([0, 1, 2])

# Apply Grover Iteration (Oracle + Diffuser)
oracle = create_f_x_oracle(target_y)
diffuser = create_diffuser()

main_qc.append(oracle, [0, 1, 2])
main_qc.append(diffuser, [0, 1, 2])

main_qc.measure([0, 1, 2], [0, 1, 2])

# Simulate
simulator = AerSimulator()
compiled_qc = transpile(main_qc, simulator)
results = simulator.run(compiled_qc).result().get_counts()

print(f"Searching for x where x + 1 = {target_y}")
print("Results (Plain Text x):", results)
```

Keluaran dari program diatas ketika dijalankan:

```
Searching for x where x + 1 = 5
Results (Plain Text x): {'001': 30, '110': 28, '101': 30, '000': 36, '010': 28, '111': 43, '011': 33, '100': 796}
```

Terlihat binary `100` atau (4 pada integer) menunjukkan probabilitas terbesar dibandingkan angka lainnya. Bagaimana algoritma Grover dibuat dan proses kerjanya seperti apa akan saya jelaskan pada bagian terpisah, namun saat ini kita sudah menemukan salah satu domain permasalahan yang bisa diselesaikan oleh komputer kuantum.

Pada catatan ini saya tidak akan membahas tentang algoritma pada komputer kuantum, melainkan berfokus ke fundamental cara kerja komputer kuantum seperti Controller Input, qubit, Controller Readout, dan hal lainnya.

## Atom Buatan (Super Atom)

Pada komputer klasik cukup mudah membayangkan seperti apa situasi di dalam CPU, misal ada banyak transistor super kecil, hampir seluruh transistor saling terhubung melalui jalur-jalur elektron (tembaga atau material lainnya) yang super kecil juga. Selain itu terdapat jalur akhir dari seluruh transistor tersebut berupa pin penghubung ke motherboard komputer, hp, atau device lain. Kumpulan transistor ini membentuk satu unit kerja terkecil yaitu gerbang logika. Lalu kumpulan gerbang logika membentuk micro-ops yg di bahas sebelumnya. Lalu kumpulan micro-ops ini didefinisikan sebagai instruksi kode mesin terdefinisi pada manual book setiap arsitektur CPU. Bahasa pemrograman level paling rendah seperti assembly berisi daftar instruksi-instruksi kode mesin. Pada level atasnya seperti bahasa pemrograman C ketika dicompile menjadi bahasa mesin.

Pada komputer kuantum apakah jalur-jalur elektron ini ada? belum tentu. Terdapat beberapa macam implementasi komputer kuantum berdasarkan mekanisme dan material yang digunakan. Hingga saat ini saya mencatat ada beberapa macam berikut:

1. Superconducting
2. Trapped ion 
3. Silicon Qubits
4. Photonic Qubits
5. Nuclear Magnetic Resonance (NMR)

Bukankah qubit itu digambarkan sebagai atom? Benar, secara konsep qubit itu memanfaatkan sifat atom seperti tingkatan energi elektron valensi dan fase. Lalu bagaimana bisa terdapat bermacam-macam implementasi komputer kuantum? Ini mungkin sedikit membingungkan, namun kita coba mulai dari apa syarat dan tujuan dari qubit.

Untuk menggunakan atom secara individu sebagai qubit, hal ini hampir tidak praktis sama sekali. Untuk mengontrol satu buah atom secara individu bukan hal yang mudah dan juga tidak stabil akibat banyak gangguan dari luar atom secara individu. Lalu apa yang dilakukan oleh para pelaku riset dan industri komputer kuantum? Mereka mencari metode lain yang dapat mewakili sifat qubit. Alhasil ditemukan beberapa alternatif yang bisa menyamai sifat qubit dan memenuhi tujuan dari komputer kuantum.

Pada catatan ini saya hanya akan membahas superconducting qubits karena ini yang populer dan sedang dikembangkan oleh IBM dan Google.

Bagaimana metode superconducting ini dapat mewakili sifat atom untuk kebutuhan qubit komputer kuantum? Syarat utama sebuah qubit dapat digunakan pada komputer kuantum yaitu:

1. Memenuhi sifat two-level state (ground E0 dan excited E1) seperti yang dijelaskan sebelumnya
2. Dapat dilakukan operasi gerbang kuantum (quantum gate) pada qubit tersebut
3. Dapat dilakukan pembacaan hasil dari qubit (readout) dan harus cukup stabil (pengukuran bisa dilakukan sebelum decoherence)

Pada superconducting sifat atom diimitasi menggunakan sebuah sirkuit elektronik yang sangat kecil yang diberi nama **Transmon**. Salah satu komponen penting dalam Transmon yaitu **Josephson Junction**. Komponent Josephson Junction adalah tempat disimpannya keadaan kuantum dari qubit Transmon. Selain Transmon, terdapat jenis sirkuit elektronik yang bisa dijadikan qubit pada metode superconducting yaitu: Flux Qubit, Fluxonium Qubit, Charge Qubit, Phase Qubit, dan mungkin ada yang lainnya. Saya tidak akan membahas detail mengenai qubit Transmon karena setelah saya baca ini terlalu mendalam ke keilmuan elektro.

Bagaimana bisa komponen Josephson Junction mengimitasi sifat atom sedangkan komponen tersebut ukurannya sangat besar dibandingkan atom (arti lain juga terdiri dari banyak atom)? Benar salah satu permasalahan pada komponent qubit tersebut adalah setiap atom memiliki state masing-masing dan akhirnya tidak memenuhi syarat utama qubit. Saya akan menyebut "Kondensasi Bose-Einstein" walaupun saya tidak mengerti secara detail apa itu. Pada "Kondensasi Bose-Einstein" kumpulan atom yang sangat banyak menjadi **superatom** pada kondisi **suhu sangat rendah (mendekati 0 Kelvin)**. Inilah mengapa kita sering mendengar komputer kuantum itu masih membutuhkan suhu yang sangat rendah untuk beroperasi karena harus memastikan Josephson Junction bertingkah seperti superatom bukan atom-atom individual yang bergerak sendiri-sendiri.

## Resonator sebagai Jembatan Multi-Fungsi

Pada penjelasan sebelumnya saya menyebutkan Controller Input menerima deretan instruksi gerbang kuantum dari program Qiskit melalui interface tertentu seperti USB, atau lainnya. Lalu bagaimana Controller Input tersebut memanipulasi qubit? Jawabannya: Resonator, antara Controller Input dan qubit dihubungkan oleh resonator.

Seperti apa bentuk fisik resonator ini? Saya sendiri blm bisa membayangkannya hingga sekarang seperti apa. Hingga saat ini saya hanya memahami konsep bahwa instruksi gerbang kuantum dikirimkan melalui Control Line lalu ke resonator (yang menghubungkan antara Control Line dan qubit) yang mengakibatkan amplitudo atau fase qubit berubah.

Selain sebagai pengirim instruksi gerbang kuantum, resonator juga digunakan untuk membaca status akhir dari qubit. Mekanismenya kurang lebih mirip, Controller Readout akan mengirimkan gelombang mikro lemah (disebut _probe pulse_) ke Readout Line, lalu diteruskan ke resonator (yang menghubungkan Readout Line dan qubit), saat qubit menerima gelombang ini, resonator akan merasakan perubahan energi kecil, perubahan energi ini diamplifikasi untuk menentukan state dari qubit apakah 1 atau 0.

Lalu pada gerbang kuantum terdapat istilah _two-qubits gates_ qubit yang artinya memodifikasi dua buah kuantum. Apakah pada gerbang kuantum ini kedua qubit harus ada mediumnya? Benar, medium tersebut adalah resonator, resonator antar qubit ini biasanya disebout _coupler_, jenis resonator ini sama seperti pada Controller Input dan Controller Readout.

## One-Qubit / Two-Qubits Gates

## Superposisi

## Keterikatan Qubit (Entanglement)

## Entanglement vs SWAP

## Interferensi

## Gerbang Kuantum

## The Measurement Problem, Schrödinger Cat, Bohr vs. Einstein

## Konsep Quantum Supremacy
