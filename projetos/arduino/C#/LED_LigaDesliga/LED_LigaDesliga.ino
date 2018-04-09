int ledPin =  7;

int btn = 12;
int btnState;

void setup()   { 
  Serial.begin(9600);
 
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
  
  pinMode(btn,INPUT_PULLUP);
  btnState = digitalRead(btn);
}

void loop() {
  char c;
  if (Serial.available() > 0) { 
    c = Serial.read();
    
    Serial.print("Recebendo: ");
    Serial.print(c, DEC);
  }  
  if(c == 97)/*(97) Código ASCII correspondente a letra "a"*/
    digitalWrite(ledPin, HIGH);
  else if(c == 98)/*(98) Código ASCII correspondente a letra "b"*/
    digitalWrite(ledPin, LOW);
  else if(c == 99) {
    Serial.print(digitalRead(ledPin) == LOW ? "\n0" : "\n1");
  }

  if(btnState != digitalRead(btn) && digitalRead(btn) == LOW) {
    btnState = digitalRead(btn);
    digitalWrite(ledPin, !digitalRead(ledPin));
    delay(1500);
  }        
}
