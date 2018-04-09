using System.IO.Ports;
using System;
using System.IO;
using System.Threading;

namespace Status
{
    class Program
    {

        static void Main(string[] args)
        {

            SerialPort nomePorta = new SerialPort();
            nomePorta.PortName = "COM3";
            nomePorta.BaudRate = 9600;
            nomePorta.Open();
            nomePorta.Write("c");
            Thread.Sleep(500);
            var retorno = nomePorta.ReadExisting().Split('\n')[1] == "0" ? "Off" : "On";
            File.WriteAllLines(@"..\..\status.txt", new string[] {retorno});
            nomePorta.Close();
        }
    }
}
