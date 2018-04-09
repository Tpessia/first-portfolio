using System.IO.Ports;
using System;

namespace Desliga
{
    class Program
    {

        static void Main(string[] args)
        {

            SerialPort nomePorta = new SerialPort();
            nomePorta.PortName = "COM3";
            nomePorta.BaudRate = 9600;
            nomePorta.Open();
            nomePorta.Write("b");
            nomePorta.Close();

        }
    }
}
