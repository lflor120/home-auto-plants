void setup()
{
    pinMode(3, OUTPUT); // setup output pin to the relay
    pinMode(6, INPUT);  // setup input pin that reads from the soil sensor
}

void loop()
{
    int sensingWater = digitalRead(6); // reading from the soil sensor
    if (sensingWater == HIGH)      // if water is sensed from soil sensor
    {
        digitalWrite(LED_BUILTIN, LOW); // turn off LED light
        digitalWrite(3, LOW);           // signal relay to stop pumping water
    }
    else // if our soil is dry
    {
        digitalWrite(LED_BUILTIN, HIGH); // while pump is running, turn on LED light
        digitalWrite(3, HIGH);           // signal the relay to start pumping water
    }
}