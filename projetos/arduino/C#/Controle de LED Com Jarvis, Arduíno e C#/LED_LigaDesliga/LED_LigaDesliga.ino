int ledPin =  13;/*(13) Pino do Arduino que será utilizado.*/
void setup()   {
 
  Serial.begin(9600);
 
  pinMode(ledPin, OUTPUT);
}

void loop() {
  
  char c;
  if (Serial.available() > 0) { 
  c = Serial.read();
  
  Serial.print(" Recebendo: ");
  Serial.print(c, DEC);
}  
  if(c == 97)/*(97) Código ASCII correspondente a letra "a"*/
  digitalWrite(ledPin, HIGH);
 else if(c == 98)/*(98) Código ASCII correspondente a letra "b"*/
  digitalWrite(ledPin, LOW);
}

/*Benedito Amaral*/
