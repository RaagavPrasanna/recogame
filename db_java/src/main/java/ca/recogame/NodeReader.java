package ca.recogame;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

public class NodeReader {

    public List<String> getData() throws IOException, InterruptedException{
    // public static void main(String[] args) throws IOException, InterruptedException {
        // create the process builder for the command
        ProcessBuilder processBuilder = new ProcessBuilder("node", "./server/bin/fetch.js", "steam", "all");
        // start the process
        Process process = processBuilder.start();
        // get the output stream of the process
        InputStream stdout = process.getInputStream();
        // create a reader to read the output stream
        BufferedReader reader = new BufferedReader(new InputStreamReader(stdout));
        // read the output
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
        // wait for the process to finish
        int exitCode = process.waitFor();
        System.out.println("Process exited with code " + exitCode);
        return null;
    }
}
