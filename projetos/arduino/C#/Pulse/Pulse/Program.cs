using System.IO.Ports;
using System;
using System.Threading;

namespace Pulse
{
    class Program
    {

        static void Main(string[] args)
        {

            SerialPort nomePorta = new SerialPort();
            nomePorta.PortName = "COM3";
            nomePorta.BaudRate = 9600;
            nomePorta.Open();
            nomePorta.Write("a");
            Thread.Sleep(500);
            nomePorta.Write("b");
            nomePorta.Close();

        }
    }
}